#![deny(missing_docs)]

use k8s_openapi::serde;
use kube::CustomResource;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(CustomResource, Deserialize, Serialize, Clone, Debug, JsonSchema)]
#[kube(
group = "yurikrupnik.dev",
version = "v1",
kind = "Topology",
namespaced
)]
#[kube(status = "TopologyStatus")]
#[kube(scale = r#"{"specReplicasPath":".spec.replicas", "statusReplicasPath":".status.replicas"}"#)]
pub struct TopologySpec {
  pub name: String,
  pub info: String,
  pub nodes: Vec<String>,
  pub image: Option<String>,
}

#[derive(Deserialize, Serialize, Clone, Debug, Default, JsonSchema)]
pub struct TopologyStatus {
  pub is_bad: bool,
  pub is_good: bool,
}

