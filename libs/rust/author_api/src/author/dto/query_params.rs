use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams};
use validator::Validate;

#[derive(Deserialize, Serialize, Debug, Validate, TS, IntoParams, Clone)]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct QueryParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub publisher: Option<String>,
}