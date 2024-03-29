use actix_web::{
    web::{Data, Json, Query},
    Responder,
};
use log::error;
// use serde::{de::DeserializeOwned, Serialize};
use crate::dto::{QueryParams, UpdateDto};
use crate::model::Book;
use rust_generic_api::{
    create_item, delete_item, get_item, list_items, update_item, MongoRepository,
};

/// Get list of book collection.
///
/// List `Books` from mongodb.
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
(status = 400, description = "User error", body = ErrorResponse),
(status = 500, description = "Internal error", body = ErrorResponse),
),
params(QueryParams),
)]
pub async fn list_book(
    db: Data<MongoRepository<Book>>,
    query: Query<QueryParams>,
) -> impl Responder {
    // TODO handle inner documents like author_id in Book
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
path = "/api/book",
tag = Book::TAG,
request_body = Book,
responses(
(status = 201, description = "Book created successfully", body = Book),
)
)]
pub async fn create_book(db: Data<MongoRepository<Book>>, body: Json<Book>) -> impl Responder {
    create_item::<Book>(db, body).await
}
