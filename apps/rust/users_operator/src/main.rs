use k8s_openapi::api::apps::v1::Deployment;
use k8s_openapi::api::batch::v1::Job;
use kube::{
  api::{Api, DeleteParams, PostParams},
  runtime::wait::{await_condition, conditions},
  Client,
};
use tracing::info;


struct Kube {

}



fn creating_kube_resource_manual() {
  info!("Creating kube resource test");

}
fn creating_kube_resource_() {
  info!("Creating kube resource test");

}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  tracing_subscriber::fmt::init();
  let client = Client::try_default().await?;
  let jobs: Api<Job> = Api::default_namespaced(client.clone());
  let deployments: Api<Deployment> = Api::default_namespaced(client.clone());

  info!("Creating job");
  let name = "empty-job";
  let data = serde_json::from_value(serde_json::json!({
        "apiVersion": "batch/v1",
        "kind": "Job",
        "metadata": {
            "name": name,
        },
        "spec": {
            "template": {
                "metadata": {
                    "name": "empty-job-pod"
                },
                "spec": {
                    "containers": [{
                        "name": "empty",
                        "image": "alpine:latest"
                    }],
                    "restartPolicy": "Never",
                }
            }
        }
    }))?;
  jobs.create(&PostParams::default(), &data).await?;
  let specs = data.spec.unwrap();
  let jobname = data.metadata.name.unwrap();
  let p = jobs.get(jobname.as_ref()).await?;
  println!("Got blog pod with containers: {:?}", p.spec.unwrap());
  info!("Waiting for job to complete");
  let cond = await_condition(jobs.clone(), name, conditions::is_job_completed());
  let _ = tokio::time::timeout(std::time::Duration::from_secs(20), cond).await?;


  info!("Cleaning up job record");
  jobs.delete(name, &DeleteParams::background()).await?;
  Ok(())
}
