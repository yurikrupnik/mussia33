use futures::{StreamExt, TryStreamExt};
use k8s_openapi::api::core::v1::Pod;
use k8s_openapi::apiextensions_apiserver::pkg::apis::apiextensions::v1::CustomResourceDefinition;
use kube::{
    api::{Api, Patch, PatchParams, ResourceExt},
    core::CustomResourceExt,
    // discovery::{ApiResource, ApiCapabilities, ApiGroup},
    runtime::{
        wait::{await_condition, conditions},
        watcher, WatchStreamExt,
    },
    Client,
    CustomResource,
};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
// use serde_json::json;

// Our custom resource
#[derive(CustomResource, Deserialize, Serialize, Clone, Debug, JsonSchema)]
#[kube(group = "clux.dev", version = "v1", kind = "Foo", namespaced)]
pub struct FooSpec {
    info: String,
    #[schemars(length(min = 3))]
    name: String,
    replicas: i32,
}

#[derive(Deserialize, Serialize, Clone, Debug, JsonSchema)]
enum CloudProviders {
    Civo,
    Gcp,
    Aws,
    AlI,
    Azure,
    Oracle,
    OnPrem,
    Linode,
    DigitalOcean,
}

#[derive(Deserialize, Serialize, Clone, Debug, JsonSchema)]
enum Users {
    Admin,
    Visitor,
    Editor,
    Viewer,
    Architect,
    Consultant,
    Outsource,
}

#[derive(CustomResource, Deserialize, Serialize, Clone, Debug, JsonSchema)]
#[kube(group = "clux.dev", version = "v1", kind = "Project", namespaced)]
pub struct ProjectSpec {
    #[schemars(length(min = 3))]
    name: String,
    cloud_provider: Vec<CloudProviders>,
    #[schemars(length(min = 3, max = 5))]
    main: CloudProviders,
    manager_cluster: bool,
    user: Users,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::try_default().await?;
    let crds: Api<CustomResourceDefinition> = Api::all(client.clone());

    // Apply the CRD so users can create Foo instances in Kubernetes
    crds.patch(
        "foos.clux.dev",
        &PatchParams::apply("my_manager"),
        &Patch::Apply(Foo::crd()),
    )
    .await?;

    crds.patch(
        "projects.clux.dev",
        &PatchParams::apply("my_manager"),
        &Patch::Apply(Project::crd()),
    )
    .await?;
    // Wait for the CRD to be ready
    tokio::time::timeout(
        std::time::Duration::from_secs(10),
        await_condition(
            crds.clone(),
            "foos.clux.dev",
            conditions::is_crd_established(),
        ),
    )
    .await?
    .expect("TODO: panic message");

    // Wait for the CRD to be ready
    tokio::time::timeout(
        std::time::Duration::from_secs(10),
        await_condition(
            crds.clone(),
            "projects.clux.dev",
            conditions::is_crd_established(),
        ),
    )
    .await?
    .expect("TODO: panic message");
    // crds.patch("projects.clux.dev",
    //            &PatchParams::apply("my_manager"),
    //            &Patch::Apply(Project::crd())
    // ).await?;

    // Wait for the CRD to be ready
    // tokio::time::timeout(
    //     std::time::Duration::from_secs(10),
    //     await_condition(crds, "projects.clux.dev", conditions::is_crd_established())
    // ).await?;
    // Pods watcher
    let pods: Api<Pod> = Api::default_namespaced(client.clone());
    let wc = watcher::Config::default();
    // let mut apply_stream = watcher(foos, wc).applied_objects().;
    let mut apply_stream = watcher(pods, wc).applied_objects().boxed();
    while let Some(f) = apply_stream.try_next().await? {
        println!("saw apply to {}", f.name_any());
    }
    // Watch for changes to foos in the configured namespace
    let foos1: Api<Foo> = Api::default_namespaced(client.clone());
    let wc = watcher::Config::default();
    // let mut apply_stream = watcher(foos, wc).applied_objects().;
    let mut apply_stream = watcher(foos1, wc).applied_objects().boxed();
    while let Some(f) = apply_stream.try_next().await? {
        println!("saw apply to {}", f.name_any());
    }
    // Watch for changes to foos in the configured namespace
    let foos: Api<Foo> = Api::default_namespaced(client.clone());
    let wc = watcher::Config::default();
    // let mut apply_stream = watcher(foos, wc).applied_objects().;
    let mut apply_stream = watcher(foos, wc).applied_objects().boxed();
    while let Some(f) = apply_stream.try_next().await? {
        println!("saw apply to {}", f.name_any());
    }
    Ok(())
}
