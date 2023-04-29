use mongo::serialize_object_id;
use mongodb::bson::oid::ObjectId;
use plurals::{Lang, Plural};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;
use validator::Validate;

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

#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Serialize, Deserialize, TS)]
pub struct Pagination {
    limit: u64,
    offset: u64,
    total: u64,
}

// #[serde(deny_unknown_fields)]
// #[serde(rename_all = "snake_case")]
/// Request to update existing `User` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[ts(export)]
pub struct User {
    #[serde(flatten)]
    id: Id,
    #[schema(default = "Jon")]
    #[validate(length(min = 2))]
    #[serde(rename = "firstName")]
    pub first_name: String,
    #[schema(default = "Doe")]
    #[serde(rename = "lastName")]
    pub last_name: String,
    #[schema(default = "job-doe")]
    pub username: String,
    #[schema(default = "job-doe@test.com")]
    #[validate(email(message = "Must be an email"))]
    pub email: String,
}

impl User {
    // pub const COLLECTION: &'static str = "users";

    pub fn get_collection<'a>(num: u8) -> &'a str {
        const FOOT: Lang = Lang::En {
            singular: "user",
            plural: "users",
        };
        FOOT.fmt(num)
    }
    // todo!
    // pub fn get_resource() -> Lang {
    //     const FOOT: Lang = Lang::En {
    //         singular: "user",
    //         plural: "users",
    //     };
    //     FOOT
    // }
}
