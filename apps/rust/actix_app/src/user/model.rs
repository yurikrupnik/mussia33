use chrono::NaiveDateTime;
use mongodb::bson::oid::ObjectId;
use rust_generic_api::{serialize_object_id, serialize_option_object_id};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams, ToSchema};
use validator::Validate;

/// Request to get existing `User` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct User {
    #[serde(
        rename(deserialize = "_id"),
        serialize_with = "serialize_option_object_id"
    )]
    #[ts(type = "string")]
    #[serde(skip_serializing_if = "Option::is_none")]
    // pub id: ObjectId,
    pub id: Option<ObjectId>,
    #[schema(default = "Jon")]
    #[validate(length(min = 2))]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[schema(default = "Doe")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub last_name: Option<String>,
    #[schema(default = "job-doe")]
    // #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(skip_serializing)]
    pub password: Option<String>,
    #[schema(default = "job-doe@test.com")]
    #[validate(email(message = "Must be an email"))]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tenant_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub provider: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub role: Option<String>,
    // #[serde(skip_serializing_if = "Option::is_none")]
    // #[ts(type = "string")]
    // pub updated_at: Option<NaiveDateTime>,
}

// #[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[derive(Deserialize, Serialize, Debug, TS, IntoParams)]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct QueryParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub limit: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub total: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub skip: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub projection: Option<String>,
    // pub projection: Option<Vec<String>>,
    // TODO pagination flatten works on 1 field only!
    // #[serde(flatten)]
    // pub pagination: Option<Pagination>,
    // #[ts(type = "number")]
    // pub limit: Option<i64>,
    // TODO: Add projection field.
    // pub projections: Option<Vec<String>>, // Add projections field.
}

impl User {
    pub const URL: &'static str = "/user";
    pub const COLLECTION: &'static str = "users";
    pub const TAG: &'static str = "Users";
}
