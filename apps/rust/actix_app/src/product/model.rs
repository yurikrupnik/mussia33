use mongodb::bson::oid::ObjectId;
use rust_generic_api::serialize_object_id;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;

/// Request to update existing `Product` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, TS)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "camelCase")]
pub struct Product {
    #[serde(rename(deserialize = "_id"), serialize_with = "serialize_object_id")]
    #[ts(type = "string")]
    pub id: ObjectId,
    #[schema(default = "product 1")]
    pub name: String,
    #[schema(default = false)]
    pub is_true: bool,
    #[schema(default = "Product 1 description")]
    pub description: String,
}

impl Product {
    pub const COLLECTION: &'static str = "products";
    // pub const URL: &'static str = "/product";
    pub const TAG: &'static str = "Products";
}
