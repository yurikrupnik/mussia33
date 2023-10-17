use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{ToSchema};
use validator::Validate;
use rust_generic_api::serialize_object_id;
use mongodb::bson::oid::ObjectId;

/// Request to update existing `Book` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct Book {
    #[serde(
    rename(deserialize = "_id"),
    serialize_with = "serialize_object_id",
    )]
    #[schema(default = "000000000000000000000000")]
    #[ts(type = "string")]
    pub id: ObjectId,
    // #[serde(flatten)]
    // pub id: Id,
    #[schema(default = "Moby Dick")]
    #[validate(length(min = 2))]
    pub title: String,
    #[schema(default = "Richard Bentley")]
    pub publisher: String,
    #[schema(default = "English")]
    pub language: String,
    #[serde(serialize_with = "serialize_object_id")]
    #[schema(default = "000000000000000000000000")]
    #[ts(type = "string")]
    pub author_id: ObjectId,
}

impl Book {
    pub const URL: &'static str = "/book";
    pub const COLLECTION: &'static str = "books";
    pub const TAG: &'static str = "Books";
}
