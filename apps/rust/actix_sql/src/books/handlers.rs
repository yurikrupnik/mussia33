use super::model::{Book, CreateBook, UpdateBook};
use crate::generic::{handle_create_result, handle_result};
use crate::Store;
use actix_web::{
    web::{Data, Json, Path},
    HttpResponse, Responder,
};
use sqlx::{query, query_as};
use mongo::ErrorResponse;

/// Get list of books.
///
/// List `Book`.
///
/// One could call the api endpoint with following curl.
/// ```text
/// curl localhost:8080/api/book
/// ```
#[utoipa::path(
get,
path = "/api/book",
tag = Book::TAG,
responses(
(status = 200, description = "Collection found successfully", body = [Book]),
(status = 400, description = "Api error", body = ErrorResponse),
(status = 500, description = "Internal error", body = ErrorResponse),
),
)]
pub async fn get_books(app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Book>(&format!("SELECT * FROM {}", Book::COLLECTION))
        .fetch_all(&app_state.pool)
        .await;
    handle_result(result)
}


/// Get Book by given user id.
///
/// Return found `Book` with status 200 or 404 not found if `Book` is not found from shared in-memory storage.
#[utoipa::path(
get,
path = "/api/book/{id}",
tag = Book::TAG,
responses(
(status = 200, description = "Book found from db", body = Book),
(status = 404, description = "Book not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(String::from("id = 1"))))
),
params(
("id", description = "Unique storage id of Book")
)
)]
pub async fn get_book(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query_as::<_, Book>(&format!("SELECT * FROM {} where id = $1", Book::COLLECTION))
        .bind(item_id)
        .fetch_one(&app_state.pool)
        .await;

    handle_result(result)
}

/// Delete Book by given path variable id.
///
/// This ednpoint needs `api_key` authentication in order to call. Api key can be found from README.md.
///
/// Api will delete `Book` by the provided id and return success 200.
/// If storage does not contain `Book` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/book/{id}",
tag = Book::TAG,
responses(
(status = 200, description = "Book deleted successfully"),
(status = 401, description = "Unauthorized to delete Book", body = ErrorResponse, example = json!(ErrorResponse::Unauthorized(String::from("missing api key")))),
(status = 404, description = "Book not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(format!(
"not found id = {}",
1
))))
),
params(
("id", description = "Unique id of Book")
),
security(
("api_key" = [])
)
)]
pub async fn delete_book(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query(&format!("DELETE FROM {} WHERE id = $1", Book::COLLECTION))
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

/// Create new Book.
///
/// Post a new `Book` in request body as json to store it. Api will return
/// created `Book` on success.
///
/// One could call the api with following curl.
/// ```text
/// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Test name", "lastName": "Test last", "email": "a@a.com", "username": "test"}' localhost:8080/api/book
/// ```
#[utoipa::path(
post,
path = "/api/book",
tag = Book::TAG,
request_body = CreateBook,
responses(
(status = 201, description = "Book created successfully", body = Book),
)
)]
pub async fn create_book(body: Json<CreateBook>, app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Book>(&format!(
        "INSERT INTO {} (title, author, description) VALUES ($1,$2,$3) RETURNING *",
        Book::COLLECTION
    ))
    .bind(&body.title)
    .bind(&body.author)
    .bind(&body.description)
    .fetch_one(&app_state.pool)
    .await;

    handle_create_result(result)
}

/// Drop Book collection.
///
/// Api will delete all `Book` and return success 200.
/// If storage does not contain `Book` with given id 404 not found will be returned.
#[utoipa::path(
delete,
path = "/api/book",
tag = Book::TAG,
responses(
(status = 200, description = "Book deleted successfully"),
),
)]
pub async fn drop_books(app_state: Data<Store>) -> impl Responder {
    let result = sqlx::query(&format!("DELETE FROM {}", Book::COLLECTION))
        .execute(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload.rows_affected()),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string()),
    }
}

/// Update Book with given id.
///
/// This endpoint supports optional authentication.
///
/// Tries to update `Book` by given id as path variable. If todo is found by id values are
/// updated according `UpdateBook` and updated `Book` is returned with status 200.
/// If todo is not found then 404 not found is returned.
#[utoipa::path(
put,
path = "/api/todo/{id}",
tag = Book::TAG,
request_body = UpdateBook,
responses(
(status = 200, description = "Book updated successfully", body = Book),
(status = 404, description = "Book not found by id", body = ErrorResponse, example = json!(ErrorResponse::NotFound(String::from("id = 1"))))
),
params(
("id", description = "Unique storage id of Book")
),
security(
(),
("api_key" = [])
)
)]
pub async fn update_book(
    app_state: Data<Store>,
    id: Path<i16>,
    body: Json<UpdateBook>,
) -> impl Responder {
    let item_id = id.into_inner();
    let result = sqlx::query_as::<_, Book>(&format!(
        "UPDATE {} SET title = $1 WHERE id = $2 RETURNING *",
        Book::COLLECTION
    ))
    // .bind(body.)
    .bind(item_id)
    .fetch_one(&app_state.pool)
    .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string()),
    }
}
