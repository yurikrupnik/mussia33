use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;
use validator::Validate;
use rust_generic_api::serialize_object_id;
use mongodb::bson::oid::ObjectId;
// use rust_generic_api::Id;

/// Request to update existing `Author` item.
#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize, Validate)]
#[derive(ToSchema, TS)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub struct Author {
    #[serde(
    rename(deserialize = "_id"),
    serialize_with = "serialize_object_id",
    )]
    #[ts(type = "string")]
    pub id: ObjectId,
    #[schema(default = "Herman")]
    #[validate(length(min = 2))]
    pub first_name: String,
    #[schema(default = "Melville")]
    #[validate(length(min = 2))]
    pub last_name: String,
}

impl Author {
    pub const URL: &'static str = "/author";
    pub const COLLECTION: &'static str = "authors";
    pub const TAG: &'static str = "Authors";
}
