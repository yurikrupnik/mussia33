use crate::shared::mongo::{
    query_param_processing::QueryParamProcessing,
    serialize::{deserialize_items, serialize_items, serialize_object_id}, // serialize::serialize_option_object_id,
};
// use chrono::NaiveDateTime;
use crate::users_mongo::model::User;
use mongodb::bson::oid::ObjectId;
use rust_proc_macros::DbResource;
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use serde_json::json;
use utoipa::{IntoParams, ToSchema};
use validator::Validate;

#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize)]
enum UserOrId {
    Id(ObjectId),
    User(User),
}

#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, DbResource)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    #[serde(rename(deserialize = "_id"), serialize_with = "serialize_object_id")]
    pub id: ObjectId,
    #[serde(serialize_with = "serialize_items")]
    pub users: Vec<ObjectId>,
    pub name: String,
}

/// NewProject is used to create a new `Project`
#[derive(Debug, Deserialize, Serialize, Validate, Clone, ToSchema)]
pub struct NewProject {
    /// New project name
    #[validate(length(min = 3))]
    pub name: String,
    /// Ref to users ids
    #[serde(deserialize_with = "deserialize_items")]
    pub users: Vec<ObjectId>,
}

/// UpdateProject is used to update a `Project`
#[derive(Debug, Deserialize, Serialize, Validate, Clone, ToSchema)]
pub struct UpdateProject {
    #[validate(length(min = 3))]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub users: Option<Vec<ObjectId>>,
}

#[derive(Clone, Deserialize, Serialize, Debug, IntoParams)]
#[serde(deny_unknown_fields)]
pub struct ProjectQueryParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
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

impl QueryParamProcessing for ProjectQueryParams {
    fn get_limit(&self) -> Option<String> {
        self.limit.clone()
    }

    fn clear_limit(&mut self) {
        self.limit = None;
    }

    fn get_projection(&self) -> Option<String> {
        self.projection.clone()
    }

    fn clear_projection(&mut self) {
        self.projection = None;
    }

    fn into_inner(self) -> serde_json::Value {
        serde_json::to_value(self).unwrap_or_else(|_| json!({}))
    }
}
