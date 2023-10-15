use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;
use validator::Validate;

/// Request to update existing `Author` item.
#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize, Validate)]
#[derive(ToSchema, TS)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub struct CreateDto {
    #[schema(default = "Herman")]
    #[validate(length(min = 2))]
    pub first_name: String,
    #[schema(default = "Melville")]
    #[validate(length(min = 2))]
    pub last_name: String,
}