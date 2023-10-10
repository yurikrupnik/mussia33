use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use ts_rs::TS;
use validator::Validate;
use crate::serialize::serialize_object_id;

#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
pub struct MongoId {
    #[serde(
    rename(deserialize = "_id"),
    serialize_with = "serialize_object_id",
    skip_serializing_if = "Option::is_none"
    )]
    #[ts(type = "string")]
    pub id: Option<ObjectId>,
}