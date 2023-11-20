use serde::{Deserialize, Serialize};
use ts_rs::TS;
use validator::Validate;
use salvo::oapi::ToSchema;


#[derive(ToSchema, Deserialize, Serialize, Debug, Validate, TS)]
#[serde(deny_unknown_fields)]
#[ts(export)]
pub struct UpdateDto {
  #[serde(skip_serializing_if = "Option::is_none")]
  pub first_name: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub last_name: Option<String>,
}
