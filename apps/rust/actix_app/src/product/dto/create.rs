use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;
use validator::Validate;

/// Request to create existing `Product` item.
#[derive(
Clone, ToSchema,
Debug, PartialEq,
Validate,
Eq, Deserialize,
Serialize, TS)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "camelCase")]
pub struct CreateDto {
    #[schema(default = "product 1")]
    pub name: String,
    #[schema(default = false)]
    pub is_true: bool,
    #[schema(default = "Product 1 description")]
    pub description: String,
}
