use salvo::oapi::ToSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use validator::Validate;

/// Request to create new `Author` item.
#[derive(ToSchema, Debug, PartialEq, Validate, Eq, Deserialize, Serialize, TS)]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct CreateDto {
    #[serde(skip_serializing_if = "Option::is_none")]
    #[validate(length(min = 3, message = "First name must be at least 3 characters"))]
    pub first_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[validate(length(min = 3, message = "Last name must be at least 3 characters"))]
    pub last_name: Option<String>,
}
