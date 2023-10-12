use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use mongodb::bson;
use thiserror::Error;

/// Item endpoint error responses
#[derive(Serialize, Deserialize, Clone, ToSchema)]
pub enum ErrorResponse {
    /// When item is not found by search term.
    NotFound(String),
    /// When there is a conflict storing a new item.
    Conflict(String),
    /// When endpoint was called without correct credentials
    Unauthorized(String),
}

#[derive(Error, Debug)]
pub enum MongodbError {
    #[error("mongodb error: {0}")]
    MongoError(#[from] mongodb::error::Error),
    #[error("error during mongodb query: {0}")]
    MongoQueryError(mongodb::error::Error),
    #[error("dulicate key error occurred: {0}")]
    MongoDuplicateError(mongodb::error::Error),
    #[error("could not serialize data: {0}")]
    MongoSerializeBsonError(bson::ser::Error),
    // #[error("could not deserialize bson: {0}")]
    // MongoDeserializeBsonError(bson::de::Error),
    #[error("could not access field in document: {0}")]
    MongoDataError(#[from] bson::document::ValueAccessError),
    #[error("invalid id used: {0}")]
    InvalidIDError(String),
}