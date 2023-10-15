use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{ToSchema, IntoParams};
use validator::Validate;

/// Request to update existing `User` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct UpdateDto {
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
