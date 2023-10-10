use plurals::{Lang, Plural};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{ToSchema, IntoParams};
use validator::Validate;
use rust_generic_api::Id;

// #[serde(deny_unknown_fields)]
/// Request to update existing `User` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub struct User {
    pub id: Option<Id>,
    #[schema(default = "Jon")]
    #[validate(length(min = 2))]
    // #[serde(rename = "firstName")]
    pub name: Option<String>,
    #[schema(default = "Doe")]
    #[serde(
    rename = "lastName",
    skip_serializing_if = "Option::is_none")
    ]
    pub last_name: Option<String>,
    #[schema(default = "job-doe")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub password: Option<String>,
    #[schema(default = "job-doe@test.com")]
    #[validate(email(message = "Must be an email"))]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email: Option<String>,
    #[serde(rename = "tenantId")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tenant_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub provider: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub role: Option<String>,
}

// #[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[derive(Deserialize, Serialize, Debug, Validate, TS, IntoParams)]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct QueryParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email: Option<String>,
    // #[serde(flatten)]
    // pub pagination: Pagination,
    // #[serde(skip_serializing_if = "Option::is_none")]
    // #[ts(type = "number")]
    // pub limit: Option<i64>,
    // TODO: Add projection field.
    // pub projections: Option<Vec<String>>, // Add projections field.
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
