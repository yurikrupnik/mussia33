use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams};
use validator::Validate;

#[derive(Deserialize, Serialize, Debug, Validate, TS, IntoParams)]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct UpdateDto {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub publisher: Option<String>,
}