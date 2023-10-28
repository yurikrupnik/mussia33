use crate::mongo::{ErrorResponse, MongoRepo};
use crate::user::{QueryParams, User};
use actix_web::{
    web::{Data, Json, Path, Query},
    HttpResponse, Responder,
};
use mongodb::bson::{doc, to_document, Document};
use mongodb::options::FindOptions;
use serde::{de::DeserializeOwned, Serialize};
use serde_json::json;
use validator::Validate;
// use rust_generic_api::{list_items, create_item, get_item, update_item, delete_item};

/// Get list of users.
///
/// List `Users` from mongodb.
///
/// One could call the api endpoint with following curl.
/// ```text
/// curl localhost:8080/api/user
/// ```
#[utoipa::path(
get,
path = "/api/user",
tag = User::TAG,
responses(
(status = 200, description = "Collection found successfully", body = [User]),
(status = 400, description = "User error", body = ErrorResponse),
(status = 500, description = "Internal error", body = ErrorResponse),
),
params(QueryParams),
)]
pub async fn user_list(db: Data<MongoRepo<User>>, mut query: Query<QueryParams>) -> impl Responder {
    let mut options = FindOptions::builder().build();

    if let Some(limit) = &query.limit {
        options.limit = Some(limit.parse::<i64>().unwrap_or(0));
        query.limit = None;
    }
    if let Some(projection) = &query.projection {
        if projection.contains(',') {
            let doc = projection.split(',').fold(doc! {}, |mut acc, item| {
                acc.insert(item.trim(), 1);
                acc
            });
            options.projection = Some(doc);
        } else {
            options.projection = Some(doc! {
                projection: 1,
            });
        }

        query.projection = None;
    }
    list_items::<User, QueryParams>(db, query, Some(options)).await
}

pub async fn list_items<T, U>(
    db: Data<MongoRepo<T>>,
    query: Query<U>,
    options: Option<FindOptions>,
) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
    U: Serialize,
{
    let query_params_json = json!(query.into_inner());
    let filter = to_document(&query_params_json).unwrap_or_else(|_| Document::new());
    let results = db.list(filter, options.unwrap_or_default()).await;
    match results {
        Ok(res) => HttpResponse::Ok().json(res),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn create_item<T>(db: Data<MongoRepo<T>>, body: Json<T>) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    match body.validate() {
        Ok(_) => (),
        Err(e) => {
            return HttpResponse::BadRequest().json(e.errors());
        }
    }
    let result = db.create(body.into_inner()).await;
    match result {
        Ok(res) => HttpResponse::Created().json(res),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn get_item<T>(db: Data<MongoRepo<T>>, path: Path<String>) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let result = db.find_by_id(&id).await;
    match result {
        Ok(Some(payload)) => HttpResponse::Ok().json(payload),
        Ok(None) => HttpResponse::NotFound().json(ErrorResponse::NotFound(format!("id = {}", &id))),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn drop_items<T>(db: Data<MongoRepo<T>>) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    let result = db.drop_db().await;
    match result {
        Ok(_) => HttpResponse::Ok().json("successfully deleted!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn delete_item<T>(db: Data<MongoRepo<T>>, path: Path<String>) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let result = db.delete(&id).await;
    match result {
        Ok(res) => {
            if res.deleted_count == 1 {
                HttpResponse::Ok().finish()
            } else {
                HttpResponse::NotFound()
                    .json(ErrorResponse::NotFound(format!("not found id = {}", &id)))
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn update_item<T>(
    db: Data<MongoRepo<T>>,
    path: Path<String>,
    body: Json<T>,
) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let result = db.update_by_id(&id, body.into_inner()).await;
    match result {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

/// Create new User in mongodb.
///
/// Post a new `User` in request body as json to store it. Api will return
/// created `User` on success.
///
/// One could call the api with following curl.
/// ```text
/// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Test name", "lastName": "Test last", "email": "a@a.com", "username": "test"}' localhost:8080/users
/// ```
#[utoipa::path(
post,
path = "/api/user",
tag = User::TAG,
request_body = User,
responses(
(status = 201, description = "User created successfully", body = User),
)
)]
pub async fn add_user(db: Data<MongoRepo<User>>, body: Json<User>) -> impl Responder {
    create_item(db, body).await
}

/// Get User by given user id.
///
/// Return found `User` with status 200 or 404 not found if `User` is not found from shared in-memory storage.
#[utoipa::path(
get,
path = "/api/user/{id}",
tag = User::TAG,
responses(
(status = 200, description = "User found from db", body = User),
(status = 404, description = "User not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(String::from("id = 1"))))
),
params(
("id", description = "Unique storage id of Todo")
)
)]
pub async fn get_user(db: Data<MongoRepo<User>>, path: Path<String>) -> impl Responder {
    get_item(db, path).await
}

/// Delete User by given path variable id.
///
/// This ednpoint needs `api_key` authentication in order to call. Api key can be found from README.md.
///
/// Api will delete `User` from mongodb by the provided id and return success 200.
/// If storage does not contain `User` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/user/{id}",
tag = User::TAG,
responses(
(status = 200, description = "User deleted successfully"),
(status = 401, description = "Unauthorized to delete User", body = ErrorResponse, example = json!(ErrorResponse::Unauthorized(String::from("missing api key")))),
(status = 404, description = "User not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(format!(
"not found id = {}",
1
))))
),
params(
("id", description = "Unique id of User")
),
security(
("api_key" = [])
)
)]
pub async fn delete_user(db: Data<MongoRepo<User>>, path: Path<String>) -> impl Responder {
    delete_item(db, path).await
}

/// Drop User collection.
///
/// Api will delete all `User` from mongodb and return success 200.
/// If storage does not contain `User` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/user",
tag = User::TAG,
responses(
(status = 200, description = "User deleted successfully"),
),
)]
pub async fn drop_users(db: Data<MongoRepo<User>>) -> impl Responder {
    drop_items(db).await
}

/// Update User with given id.
///
/// This endpoint supports optional authentication.
///
/// Tries to update `User` by given id as path variable. If user is found by id values are
/// updated according `TodoUpdateRequest` and updated `User` is returned with status 200.
/// If todo is not found then 404 not found is returned.
#[utoipa::path(
put,
path = "/api/user/{id}",
tag = User::TAG,
request_body = User,
responses(
(status = 200, description = "User updated successfully", body = User),
(status = 404, description = "User not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(String::from("id = 1"))))
),
params(
("id", description = "Unique storage id of Todo")
),
security(
(),
("api_key" = [])
)
)]
pub async fn update_user(
    db: Data<MongoRepo<User>>,
    path: Path<String>,
    body: Json<User>,
) -> impl Responder {
    update_item(db, path, body).await
    // let id = path.into_inner();
    // if id.is_empty() || id.len() != 24 {
    //     return HttpResponse::BadRequest().body("invalid ID");
    // };
    // let result = db.update_by_id(&id, body.into_inner()).await;
    // match result {
    //     Ok(data) => HttpResponse::Ok().json(data),
    //     Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    // }
}
