// copied from: https://github.com/cloud-native-skunkworks/rust-operator
//! Generated types support documentation
#![deny(missing_docs)]
use anyhow::Ok;
use futures::{pin_mut, TryStreamExt};

use tracing::*;
use apiexts::CustomResourceDefinition;
use k8s_openapi::{apiextensions_apiserver::pkg::apis::apiextensions::v1 as apiexts, api::core::v1::Node};
use k8s_openapi::api::core::v1::Pod;

use kube::{
  api::{Api, Patch, PatchParams,ListParams},
  runtime::wait::{await_condition, conditions},
  runtime::{watcher, WatchStreamExt},
  Client, CustomResourceExt,
};


mod crd;
use crd::{Topology, TopologySpec};

const CRD_NAME : &str = "topologies.yurikrupnik.dev";

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  tracing_subscriber::fmt::init();
  let client = Client::try_default().await?;

  let ssapply = PatchParams::apply("topology_apply").force();
  // 0. Ensure the CRD is installed, could do this once
  let crds: Api<CustomResourceDefinition> = Api::all(client.clone());
  info!("Creating crd: {}", serde_yaml::to_string(&Topology::crd())?);
  crds.patch(CRD_NAME, &ssapply, &Patch::Apply(Topology::crd()))
    .await?;

  info!("Waiting for the api-server to accept the CRD");
  let establish = await_condition(crds, CRD_NAME, conditions::is_crd_established());
  let _ = tokio::time::timeout(std::time::Duration::from_secs(10), establish).await?;

  // Let's get the current node topology
  // let nodes: Api<Node> = Api::all(client.clone());
  // New client copy to inject our resource
  let topologys: Api<Topology> = Api::default_namespaced(client.clone());
  // let topologys: Api<Topology> = Api::

  // let spec = create_spec(nodes).await;
  //
  // // println!("omg pods!!! {pods:?}");
  // println!("omg topologys!!! {topologys:?}");
  //
  // let tt = topologys.patch("default", &ssapply,
  //                          &Patch::Apply(&Topology::new("default", spec))).await?;
  //
  // info!("Applied 1 {}: {:?}", tt.name_any(), tt.spec);


  // watch the topology resources
  let obs = watcher(topologys, ListParams::default()).applied_objects();
  pin_mut!(obs);
  while let Some(o) = obs.try_next().await? {
    let _node = o;
    {
      let nodes: Api<Node> = Api::all(client.clone());
      let spec = create_spec(nodes.clone()).await;
      let topologys: Api<Topology> = Api::default_namespaced(client.clone());

      let pods: Api<Pod> = Api::default_namespaced(client.clone());
      println!("omg pods!!! {pods:?}");
      println!("omg topologys!!! {topologys:?}");
      let _tt = topologys.patch("default",
                                &ssapply,
                                &Patch::Apply(&Topology::new("default", spec))).await?;
    }
  }

  Ok(())
}
async fn create_spec(nodes: Api<Node>) -> TopologySpec {

  let node_list = nodes.list(&ListParams::default()).await.unwrap();
  let mut node_names = Vec::new();
  for node in node_list {
    node_names.push(node.metadata.name.unwrap());
  }
  TopologySpec {
    name: "default".to_string(),
    info: "my info".to_string(),
    nodes: node_names,
    image: Some("nginx".to_string())
  }
}
