use crate::mongo::serialize_object_id;
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;

/// Request to update existing `Product` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, TS)]
#[serde(rename_all = "camelCase")]
pub struct Product {
    #[serde(
        rename(deserialize = "_id"),
        serialize_with = "serialize_object_id",
        skip_serializing_if = "Option::is_none"
    )]
    #[ts(type = "string")]
    pub id: Option<ObjectId>,
    #[schema(default = "product 1")]
    pub name: String,
    #[schema(default = false)]
    pub is_true: bool,
    #[serde(serialize_with = "serialize_object_id")]
    #[ts(type = "string")]
    pub user_id: Option<ObjectId>,
}

impl Product {
    pub const COLLECTION: &'static str = "products";
}
