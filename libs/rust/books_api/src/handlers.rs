use actix_web::{web::{Data, Query, Json}, Responder};
use serde::{de::DeserializeOwned, Serialize};
use crate::model::Book;
use crate::dto::{QueryParams, UpdateDto};
// todo export and import by name for example service::MongoRepository, actions: list_items, create_item, get_item, update_item, delete_item
use rust_generic_api::{MongoRepository, list_items, create_item, get_item, update_item, delete_item};

#[derive(utoipa::ToResponse)]
struct PersonResponse {
    value: String
}

/// Get list of books.
///
/// List `Books` from mongodb.
///
/// One could call the api endpoint with following curl.
/// ```text
/// curl localhost:8080/api/books
/// ```
#[utoipa::path(
get,
path = "/api/books",
responses(
(status = 200, description = "Collection found successfully", body = [Book]),
(status = 400, description = "User error", body = ErrorResponse),
(status = 500, description = "Internal error", body = ErrorResponse),
),
params(QueryParams),
)]
pub async fn list_book(
    db: Data<MongoRepository<Book>>,
    query: Query<QueryParams>,
) -> impl Responder {
    list_items::<Book, QueryParams>(db, query, None).await
}

/// Create new Book in mongodb.
///
/// Post a new `Book` in request body as json to store it. Api will return
/// created `Book` on success.
///
/// One could call the api with following curl.
/// ```text
/// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Test name", "lastName": "Test last", "email": "a@a.com", "username": "test"}' localhost:8080/users
/// ```
#[utoipa::path(
post,
path = "/api/books",
request_body = Book,
responses(
(status = 201, description = "Book created successfully", body = Book),
)
)]
pub async fn create_book(db: Data<MongoRepository<Book>>, body: Json<Book>) -> impl Responder {
    create_item::<Book>(db, body).await
}