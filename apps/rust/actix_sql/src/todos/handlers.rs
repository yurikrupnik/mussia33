use super::model::{CreateTodo, Todo, UpdateTodo};
use crate::generic::{handle_create_result, handle_result};
use crate::Store;
use actix_web::{
    web::{Data, Json, Path},
    HttpResponse, Responder,
};
use rust_proc_macros::{DbResource, Reflective};
use sqlx::{query, query_as};
use mongo::ErrorResponse;

/// Get list of todos.
///
/// List `Todo`.
///
/// One could call the api endpoint with following curl.
/// ```text
/// curl localhost:8080/api/todo
/// ```
#[utoipa::path(
get,
path = "/api/todo",
tag = Todo::TAG,
responses(
(status = 200, description = "Collection found successfully", body = [Todo]),
(status = 400, description = "User error", body = ErrorResponse),
(status = 500, description = "Internal error", body = ErrorResponse),
),
)]
pub async fn get_todos(app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Todo>(&format!("SELECT * FROM {}", Todo::COLLECTION))
        .fetch_all(&app_state.pool)
        .await;
    handle_result(result)
}

/// Get User by given user id.
///
/// Return found `User` with status 200 or 404 not found if `User` is not found from shared in-memory storage.
#[utoipa::path(
get,
path = "/api/todo/{id}",
tag = Todo::TAG,
responses(
(status = 200, description = "Todo found from db", body = Todo),
(status = 404, description = "Todo not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(String::from("id = 1"))))
),
params(
("id", description = "Unique storage id of Todo")
)
)]
pub async fn get_todo(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query_as::<_, Todo>(&format!("SELECT * FROM {} where id = $1", Todo::COLLECTION))
        .bind(item_id)
        .fetch_one(&app_state.pool)
        .await;

    handle_result(result)
}

/// Delete Todo by given path variable id.
///
/// This ednpoint needs `api_key` authentication in order to call. Api key can be found from README.md.
///
/// Api will delete `Todo` by the provided id and return success 200.
/// If storage does not contain `Todo` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/todo/{id}",
tag = Todo::TAG,
responses(
(status = 200, description = "Todo deleted successfully"),
(status = 401, description = "Unauthorized to delete Todo", body = ErrorResponse, example = json!(ErrorResponse::Unauthorized(String::from("missing api key")))),
(status = 404, description = "Todo not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(format!(
"not found id = {}",
1
))))
),
params(
("id", description = "Unique id of Todo")
),
security(
("api_key" = [])
)
)]
pub async fn delete_todo(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query(&format!("DELETE FROM {} WHERE id = $1", Todo::COLLECTION))
        .bind(item_id)
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

fn create_query_keys(acc: String, s: &&str) -> String {
    if acc.is_empty() {
        return acc + s;
    }
    acc + "," + s
}

// fn create_query<'a, T: impl Reflective>(keys_string: String) -> &'a str {
//     &format!("INSERT INTO {} ({}) VALUES ($1, false) RETURNING *", T::COLLECTION, keys_string)
// }

/// Create new Todo.
///
/// Post a new `Todo` in request body as json to store it. Api will return
/// created `Todo` on success.
///
/// One could call the api with following curl.
/// ```text
/// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Test name", "lastName": "Test last", "email": "a@a.com", "username": "test"}' localhost:8080/users
/// ```
#[utoipa::path(
post,
path = "/api/todo",
tag = Todo::TAG,
request_body = CreateTodo,
responses(
(status = 201, description = "Todo created successfully", body = Todo),
)
)]
pub async fn create_todo(body: Json<CreateTodo>, app_state: Data<Store>) -> impl Responder {
    let keys = CreateTodo::field_names()
        .iter()
        .fold(String::new(), create_query_keys);

    let query = &format!(
        "INSERT INTO {} ({}) VALUES ($1, false) RETURNING *",
        Todo::COLLECTION,
        keys
    );
    let result = query_as::<_, Todo>(query)
        .bind(&body.title)
        .fetch_one(&app_state.pool)
        .await;

    handle_create_result(result)
}


/// Drop Todo collection.
///
/// Api will delete all `Todo` and return success 200.
/// If storage does not contain `Todo` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/todo",
tag = Todo::TAG,
responses(
(status = 200, description = "Todo deleted successfully"),
),
)]
pub async fn drop_todos(app_state: Data<Store>) -> impl Responder {
    let result = sqlx::query(&format!("DELETE FROM {}", Todo::COLLECTION))
        .execute(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload.rows_affected()),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string()),
    }
}

/// Update Todo with given id.
///
/// This endpoint supports optional authentication.
///
/// Tries to update `Todo` by given id as path variable. If todo is found by id values are
/// updated according `TodoUpdateRequest` and updated `Todo` is returned with status 200.
/// If todo is not found then 404 not found is returned.
#[utoipa::path(
put,
path = "/api/todo/{id}",
tag = Todo::TAG,
request_body = UpdateTodo,
responses(
(status = 200, description = "Todo updated successfully", body = Todo),
(status = 404, description = "Todo not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(String::from("id = 1"))))
),
params(
("id", description = "Unique storage id of Todo")
),
security(
(),
("api_key" = [])
)
)]
pub async fn update_todo(
    app_state: Data<Store>,
    id: Path<i16>,
    body: Json<UpdateTodo>,
) -> impl Responder {
    let item_id = id.into_inner();
    let result = sqlx::query_as::<_, Todo>(&format!(
        "UPDATE {} SET completed = $1 WHERE id = $2 RETURNING *",
        Todo::COLLECTION
    ))
    .bind(body.completed)
    .bind(item_id)
    .fetch_one(&app_state.pool)
    .await;

    handle_result(result)
}
