use super::model::{NewUser, User, UpdateProfile};
use crate::generic::{handle_create_result, handle_result};
use crate::Store;
use actix_web::{
    web::{Data, Json, Path},
    HttpResponse, Responder,
};
use log::error;
use rust_proc_macros::{
    DbResource,
    // Reflective
};
use sqlx::{query, query_as};
use validator::Validate;
use mongo::ErrorResponse;
// use serde_json::Value;
use crate::extractors::Auth;

/// Get list of users.
///
/// List `User`.
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
)]
pub async fn get_users(auth: Auth, app_state: Data<Store>) -> impl Responder {
    error!("auth: {:?}", auth);
    let result = query_as::<_, User>(&format!("SELECT * FROM {}", User::COLLECTION))
        .fetch_all(&app_state.pool)
        .await;
    handle_result(result)
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
("id", description = "Unique storage id of User")
)
)]
pub async fn get_user(id: Path<String>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let query = &format!("SELECT * FROM {} where id = '{}'", User::COLLECTION, item_id);
    let result = query_as::<_, User>(query)
        .fetch_one(&app_state.pool)
        .await;

    handle_result(result)
}

/// Delete User by given path variable id.
///
/// This ednpoint needs `api_key` authentication in order to call. Api key can be found from README.md.
///
/// Api will delete `User` by the provided id and return success 200.
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
pub async fn delete_user(id: Path<String>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let q = &format!("DELETE FROM {} WHERE id = '{}'", User::COLLECTION, item_id);
    let result = query(q)
        .execute(&app_state.pool)
        .await;
    match result {
        Ok(result) => {
            if result.rows_affected() > 0 {
                HttpResponse::Ok().json(format!("Deleted item with ID: {}", item_id))
            } else {
                HttpResponse::NotFound().json(format!("Item with ID: {} not found", item_id))
            }
        }
        Err(e) => HttpResponse::InternalServerError().json(e.to_string()),
    }
}


/// Create new User.
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
request_body = NewUser,
responses(
(status = 201, description = "User created successfully", body = User),
)
)]
pub async fn create_user(body: Json<NewUser>, app_state: Data<Store>) -> impl Responder {
    // let keys = NewUser::field_names()
    //     .iter()
    //     .fold(String::new(), create_query_keys);
    //
    // error!("keys: {}", keys);
    match body.validate() {
        Ok(_) => (),
        Err(e) => {
            return HttpResponse::BadRequest().json(e.errors());
        }
    }
    let query = &format!(
        "INSERT INTO {} (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        User::COLLECTION,
    );
    let result = query_as::<_, User>(query)
        .bind(&body.username)
        .bind(&body.email)
        .bind(&body.password)
        .fetch_one(&app_state.pool)
        .await;

    handle_create_result(result)
}


/// Drop User collection.
///
/// Api will delete all `User` and return success 200.
/// If storage does not contain `User` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/user",
tag = User::TAG,
responses(
(status = 200, description = "User deleted successfully"),
),
)]
pub async fn drop_users(app_state: Data<Store>) -> impl Responder {
    let result = sqlx::query(&format!("DELETE FROM {}", User::COLLECTION))
        .execute(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload.rows_affected()),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string()),
    }
}

/// Update User with given id.
///
/// This endpoint supports optional authentication.
///
/// Tries to update `User` by given id as path variable. If user is found by id values are
/// updated according `UpdateProfile` and updated `User` is returned with status 200.
/// If user is not found then 404 not found is returned.
#[utoipa::path(
put,
path = "/api/user/{id}",
tag = User::TAG,
request_body = UpdateProfile,
responses(
(status = 200, description = "User updated successfully", body = User),
(status = 404, description = "User not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(String::from("id = 1"))))
),
params(
("id", description = "Unique storage id of User")
),
security(
(),
("api_key" = [])
)
)]
pub async fn update_user(
    app_state: Data<Store>,
    id: Path<String>,
    body: Json<UpdateProfile>,
) -> impl Responder {
    match body.validate() {
        Ok(_) => (),
        Err(e) => {
            return HttpResponse::BadRequest().json(e.errors());
        }
    }

    let item_id = id.into_inner();

    // todo handle more generic query creation - sets null if data did not pass
    // let mut formatted_string = String::from("");
    // let serialized: Value = serde_json::to_value(&body).unwrap();
    // if let Value::Object(map) = serialized {
    //     let formatted_pairs: Vec<String> = map.iter()
    //         .filter_map(|(key, value)| {
    //             if !value.is_null() {
    //                 Some(format!("{} = {}", key, value))
    //             } else {
    //                 None
    //             }
    //         })
    //         .collect();
    //
    //     formatted_string = formatted_pairs.join(", ");
    // }

    // full_name = $1, bio = $2, image = $3
    // error!("formatted_string: {}", formatted_string);
    let query = &format!(
        "UPDATE {} SET full_name = $1, bio = $2, image = $3 WHERE id = '{}' RETURNING *",
        User::COLLECTION,
        item_id
    );
    let result = sqlx::query_as::<_, User>(query)
        .bind(&body.full_name)
        .bind(&body.bio)
        .bind(&body.image)
        .fetch_one(&app_state.pool)
        .await;

    handle_result(result)
}
