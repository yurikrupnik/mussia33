use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{ToSchema};
use validator::Validate;
use rust_generic_api::Id;

/// Request to update existing `Author` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub struct Author {
    #[serde(flatten)]
    pub id: Id,
    #[schema(default = "Herman")]
    #[validate(length(min = 2))]
    pub first_name: String,
    #[schema(default = "Melville")]
    #[validate(length(min = 2))]
    pub last_name: String,
}

impl Author {
    pub const COLLECTION: &'static str = "authors";
}
