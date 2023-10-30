use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams, IntoResponses, PartialSchema, ToResponse, ToSchema};
use validator::Validate;

/// Request to create existing `User` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct CreateDto {
    #[schema(default = "Jon")]
    #[validate(length(min = 2))]
    pub name: String,
    #[schema(default = "Doe")]
    pub last_name: String,
    #[schema(default = "job-doe")]
    pub password: String,
    #[schema(default = "job-doe@test.com")]
    #[validate(email(message = "Must be an email"))]
    pub email: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tenant_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub provider: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub role: Option<String>,
}
