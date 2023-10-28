use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;
use validator::Validate;

/// Request to update existing `Product` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Validate, Eq, Deserialize, Serialize, TS)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "camelCase")]
pub struct UpdateDto {
    #[schema(default = "product 2")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[schema(default = true)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub is_true: Option<bool>,
    #[schema(default = "Product 2 description")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
}
