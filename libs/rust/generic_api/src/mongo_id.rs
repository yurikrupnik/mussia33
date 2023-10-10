use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{ToSchema};
use validator::Validate;

pub fn serialize_object_id<T>(
    oid: &Option<ObjectId>,
    s: T
) -> Result<T::Ok, T::Error>
    where
        T: serde::Serializer,
{
    match oid.as_ref().map(|x| x.to_hex()) {
        Some(v) => s.serialize_str(&v),
        None => s.serialize_none(),
    }
}

#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
pub struct Id {
    #[serde(
    rename(deserialize = "_id"),
    serialize_with = "serialize_object_id",
    skip_serializing_if = "Option::is_none"
    )]
    #[ts(type = "string")]
    pub id: Option<ObjectId>,
}