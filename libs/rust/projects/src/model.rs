// use mongo::serialize_object_id;
// use mongodb::bson::oid::ObjectId;
use plurals::{Lang, Plural};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;
use validator::Validate;
use mongo::MongoId;
use schemars::JsonSchema;

#[derive(Deserialize, Serialize, PartialEq, Eq, Clone, Debug, JsonSchema, TS)]
pub enum CloudProviders {
    Gcp,
    Aws,
    Ali,
    Azure,
    Oracle
}

// #[serde(deny_unknown_fields)]
// #[serde(rename_all = "snake_case")]
/// Request to update existing `Project` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[ts(export)]
pub struct Project {
    #[serde(flatten)]
    id: MongoId,
    #[schema(default = "Project1")]
    #[validate(length(min = 3))]
    pub name: String,
    pub provider: Vec<CloudProviders>,
}

impl Project {
    pub const COLLECTION: &'static str = "projects";

    pub fn get_collection<'a>(num: u8) -> &'a str {
        const FOOT: Lang = Lang::En {
            singular: "project",
            plural: "projects",
        };
        FOOT.fmt(num)
    }
}