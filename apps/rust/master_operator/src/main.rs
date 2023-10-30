use futures::{StreamExt, TryStreamExt};
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

// use fluvio_helm::{Chart, HelmClient, HelmError};
// fn install_helm_chart() {
//     // let client = HelmClient::new();
//     // client::
// }

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
    GCP,
    AWS,
    AlI,
    AZURE,
    ORACLE,
}

#[derive(Deserialize, Serialize, Clone, Debug, JsonSchema)]
enum Users {
    Admin,
    Visitor,
    Editor,
    Viewer,
}

#[derive(CustomResource, Deserialize, Serialize, Clone, Debug, JsonSchema)]
#[kube(group = "clux.dev", version = "v1", kind = "Project", namespaced)]
pub struct ProjectSpec {
    #[schemars(length(min = 3))]
    name: String,
    cloud_provider: Vec<CloudProviders>,
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
    // Watch for changes to foos in the configured namespace
    let foos: Api<Foo> = Api::default_namespaced(client.clone());
    let wc = watcher::Config::default();
    let mut apply_stream = watcher(foos, wc).applied_objects().boxed();
    while let Some(f) = apply_stream.try_next().await? {
        println!("saw apply to {}", f.name_any());
    }
    Ok(())
}
