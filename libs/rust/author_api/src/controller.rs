use crate::dto::{CreateDto, QueryParams};
use crate::model::Author;
use actix_web::{
    web::{Data, Json, Query},
    Responder,
};
use rust_generic_api::{
    create_item, delete_item, get_item, list_items, update_item, MongoRepository,
};

/// Get list of authors.
///
/// List `Authors` from mongodb.
///
/// One could call the api endpoint with following curl.
/// ```text
/// curl localhost:8080/api/author
/// ```
#[utoipa::path(
get,
path = "/api/author",
tag = Author::TAG,
responses(
(status = 200, description = "Collection found successfully", body = [Author]),
(status = 400, description = "User error", body = ErrorResponse),
(status = 500, description = "Internal error", body = ErrorResponse),
),
params(QueryParams),
)]
pub async fn list_author(
    db: Data<MongoRepository<Author>>,
    query: Query<QueryParams>,
) -> impl Responder {
    list_items::<Author, QueryParams>(db, query, None).await
}

/// Create new Author in mongodb.
///
/// Post a new `Author` in request body as json to store it. Api will return
/// created `Author` on success.
///
/// One could call the api with following curl.
/// ```text
/// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Test name", "lastName": "Test last", "email": "a@a.com", "username": "test"}' localhost:8080/users
/// ```
#[utoipa::path(
post,
path = "/api/author",
tag = Author::TAG,
request_body = Author,
responses(
(status = 201, description = "Book created successfully", body = Author),
)
)]
pub async fn create_author(
    db: Data<MongoRepository<Author>>,
    body: Json<Author>,
) -> impl Responder {
    create_item::<Author>(db, body).await
}
