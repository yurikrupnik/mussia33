use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use utoipa::ToSchema;

#[derive(ToSchema, FromRow, Deserialize, Serialize, Debug)]
pub struct Book {
    pub id: i32,
    pub title: String,
    pub author: String,
    pub description: String,
}

#[derive(ToSchema, Deserialize, Serialize, Debug, Clone)]
pub struct CreateBook {
    pub title: String,
    pub author: String,
    pub description: String,
}

#[derive(ToSchema, Deserialize, Serialize, Debug, Clone)]
pub struct UpdateBook {
    pub title: String,
    pub author: String,
    pub description: String,
}

impl Book {
    pub const URL: &'static str = "/api/book";
    pub const COLLECTION: &'static str = "books";
    pub const TAG: &'static str = "Books";
}
