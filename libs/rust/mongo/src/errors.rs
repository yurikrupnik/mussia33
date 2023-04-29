use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

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
