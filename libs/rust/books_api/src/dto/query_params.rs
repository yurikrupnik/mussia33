use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams};
use validator::Validate;


#[derive(Deserialize, Serialize, Debug, Validate, TS, IntoParams)]
#[ts(export)]
pub struct Pagination {
    #[serde(skip_serializing_if = "Option::is_none")]
    #[ts(type = "number")]
    limit: Option<u64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[ts(type = "number")]
    offset: Option<u64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[ts(type = "number")]
    total: Option<u64>,
}
    // #[ts(type = "number")]

// #[serde(deny_unknown_fields)]
#[derive(Deserialize, Serialize, Debug, Validate, TS, IntoParams)]
#[ts(export)]
pub struct QueryParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub publisher: Option<String>,

    #[serde(flatten)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub pagination: Option<Pagination>,
}