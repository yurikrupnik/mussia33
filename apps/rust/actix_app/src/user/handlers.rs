use crate::user::User;
use actix_web::{web, HttpResponse, Responder};
use mongo::{ErrorResponse, MongoRepo};
use serde::{de::DeserializeOwned, Serialize};
use validator::Validate;

/// Get list of users.
///
/// List `Users` from mongodb.
///
/// One could call the api endpoint with following curl.
/// ```text
/// curl localhost:8080/users
/// ```
#[utoipa::path(
get,
path = "/api/users",
responses(
(status = 200, description = "Users found successfully", body = [User]),
),
params(
)
)]
pub async fn user_list<T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static>(
    db: web::Data<MongoRepo<T>>,
) -> impl Responder {
    let results = db.list().await;
    match results {
        Ok(res) => HttpResponse::Ok().json(res),
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
path = "/api/users",
request_body = User,
responses(
(status = 201, description = "User created successfully", body = User),
)
)]
pub async fn add_user(db: web::Data<MongoRepo<User>>, body: web::Json<User>) -> impl Responder {
    match body.validate() {
        Ok(_) => (),
        Err(e) => {
            return HttpResponse::BadRequest().json(e.errors());
        }
    }
    let result = db.create(body.clone()).await;
    match result {
        Ok(res) => HttpResponse::Created().json(res),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

/// Get User by given user id.
///
/// Return found `User` with status 200 or 404 not found if `User` is not found from shared in-memory storage.
#[utoipa::path(
get,
path = "/api/users/{id}",
responses(
(status = 200, description = "User found from db", body = User),
(status = 404, description = "User not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(String::from("id = 1"))))
),
params(
("id", description = "Unique storage id of Todo")
)
)]
pub async fn get_user(db: web::Data<MongoRepo<User>>, path: web::Path<String>) -> impl Responder {
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

/// Delete User by given path variable id.
///
/// This ednpoint needs `api_key` authentication in order to call. Api key can be found from README.md.
///
/// Api will delete `User` from mongodb by the provided id and return success 200.
/// If storage does not contain `User` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/users/{id}",
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
pub async fn delete_user(db: web::Data<MongoRepo<User>>, path: web::Path<String>) -> HttpResponse {
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

/// Drop User collection.
///
/// Api will delete all `User` from mongodb and return success 200.
/// If storage does not contain `User` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/users",
responses(
(status = 200, description = "User deleted successfully"),
),
)]
pub async fn drop_users(db: web::Data<MongoRepo<User>>) -> HttpResponse {
    let result = db.drop_db().await;
    match result {
        Ok(_) => HttpResponse::Ok().json("successfully deleted!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
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
path = "/api/users/{id}",
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
pub async fn update_user(path: web::Path<String>, body: web::Json<User>) -> impl Responder {
    let id = path.as_str();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    HttpResponse::Ok().json(body)
    // const result = db.update_by_id(&id).await;
    // let obj_id = ObjectId::parse_str(id).unwrap();
    // let result = db.find_by_id(&id).await;
    // match result {
    //     Ok(Some(payload)) => HttpResponse::Ok().json(payload),
    //     Ok(None) => HttpResponse::NotFound().json(ErrorResponse::NotFound(format!("id = {}", &id))),
    //     Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    // }
}
