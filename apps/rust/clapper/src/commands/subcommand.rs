use std::any::Any;
// use std::error::Error;
use std::fmt::Debug;

use crate::commands::{ClusterAction, ClusterSubcommand};
use crate::commands::{SystemAction, SystemSubcommand};
use crate::commands::{UserAction, UsersSubcommand};
use clap::{FromArgMatches, Parser};

/// Simple program to manage personal cli application
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = "Long about of an command")]
#[clap(
    version = "1.0",
    author = "Yuri Krupnik",
    about = "Manage users, projects, and systems"
)]
pub struct Args {
    /// Subcommand Name
    #[clap(subcommand)]
    subcommand: Subcommand,
}

#[derive(Parser, Debug)]
pub enum Subcommand {
    Users(UsersSubcommand),
    Systems(SystemSubcommand),
    Cluster(ClusterSubcommand),
}

// pub async fn create_api(command: String) -> std::io::Result<Child> {
//     println!("{command} PASSED!!");
//     let child = Command::new("sh").arg("-c").arg(&command).spawn()?;
//
//     Ok(child)
// }
// use futures::{StreamExt, TryStreamExt};
// use k8s_openapi::api::apps::v1::Deployment;
// use k8s_openapi::api::core::v1::Pod;
// use kube::{
//     api::{Api, ListParams, PostParams, ResourceExt},
//     Client, Config,
// };
// async fn list_pods() -> Result<Api<Pod>, Box<dyn std::error::Error>> {
//     let client = Client::try_default().await?;
//     // Read pods in the configured namespace into the typed interface from k8s-openapi
//     let pods: Api<Pod> = Api::default_namespaced(client.clone());
//     let deployment: Api<Deployment> = Api::default_namespaced(client.clone());
//     let deployments = deployment.list(&ListParams::default()).await?;
//     let list = pods.list(&ListParams::default()).await?;
//     for p in list {
//         println!("found pod {}", p.name_any());
//     }
//     for d in deployments {
//         println!("found pod {}", d.name_any());
//     }
//
//     Ok(pods)
// }

fn handle_read() {
    println!("calling my script1!!");
    run_command_with_spawn("kubectx");
}

use std::process::{Child, Command};
pub fn run_command_with_spawn(command: &str) -> Child {
    let child = Command::new("sh")
        .arg("-c")
        .arg(command)
        // .output()?;
        .spawn()
        .expect("command failed to run");
    child
}

// Modify run_command to return a Result<ExitStatus, Box<dyn Error>> instead of Child
// fn run_command_with_statuses_blocking(command: &str) -> Result<Child, Box<dyn Error>> {
//     let status = Command::new(command)
//         // .arg("-c")
//         // .arg(command)
//         .spawn()?; // This will block until the command completes
//     Ok(status)
// }

// #[derive(Debug, Deserialize, Serialize)]
// struct HelmSearchResult {
//     // Define the fields you need based on the JSON structure
//     // For example, if the JSON has a field named "name", you can add it here.
//     name: String,
//     version: String,
//     app_version: String,
//     description: String,
//     // Add other fields as needed.
// }

// use std::process::{Stdio};
// use std::io::{BufRead, BufReader};
//
// use serde_json::Value;
// async fn run_multiple_commands(command: &str) {
//     // let child = run_command_with_spawn("helm search repo external-secrets --output json");
//     // let child = Command::new("sh")
//     //     .arg("-c")
//     //     .arg("helm search repo external-secrets --output json")
//     //     // .output()
//     //     .spawn()
//     //     .unwrap();
//     // let output = child;
//     // // let output = child.wait_with_output();
//     // println!("output {output:?}");
//     // let sr = output.stdout;
//     // println!("output stdout: {sr:?}");
//     let sd= "sh".to_string();
//     let cmd = Command::new(sd)
//         .arg("-c")
//         .arg(command)
//         // .output()?;
//         // .spawn()
//         // .expect("command failed to run");
//     // let mut cmd = Command::new("sh".to_string())
//     //     .arg("-c")
//     //     .arg("helm search repo external-secrets --output json")
//         .stdout(Stdio::piped()) // Redirect stdout to a pipe
//         .stderr(Stdio::piped()); // Redirect stderr to a pipe
//
//     // Start the command
//     let mut child = cmd.spawn().expect("Failed to start command");
//     // Read the stdout and stderr streams
//     let stdout = child.stdout.take().expect("Failed to capture stdout");
//     let stderr = child.stderr.take().expect("Failed to capture stderr");
//     // Create BufReaders to read lines from stdout and stderr
//     let stdout_reader = BufReader::new(stdout);
//     let stderr_reader = BufReader::new(stderr);
//     // Start separate threads to read and print stdout and stderr
//     let stdout_thread = std::thread::spawn(move || {
//         for line in stdout_reader.lines() {
//             if let Ok(line) = line {
//                 println!("stdout: {}", line);
//             }
//         }
//     });
//
//     let stderr_thread = std::thread::spawn(move || {
//         for line in stderr_reader.lines() {
//             if let Ok(line) = line {
//                 eprintln!("stderr: {}", line);
//             }
//         }
//     });
//     // Wait for the command to finish
//     let status = child.wait().expect("Failed to wait for command");
//
//     // Wait for the stdout and stderr threads to finish
//     let _ = stdout_thread.join();
//     let _ = stderr_thread.join();
//
//     // Check the exit status of the command
//     if status.success() {
//         println!("Command exited successfully");
//     } else {
//         eprintln!("Command failed with exit code: {:?}", status.code());
//     }
// }

pub fn parse_subcommand() {
    let cli = Args::parse();
    println!("Hello {:?}!", cli.subcommand.type_id());
    // for _ in 0..cli.count {
    // }
    match cli.subcommand {
        Subcommand::Cluster(cmd) => match cmd.action {
            ClusterAction::Create(dto) => {
                // let ds = dto.update_from(&["--name", "test"]);
                // let sd= dto.update_from_arg_matches("");
                println!("create_cluster.type_id() {:?}", dto.type_id());
                println!("update_cluster {dto:?} ");
            }
            ClusterAction::Update(dto) => {
                println!("update_cluster.type_id() {:?}", dto.type_id());
                println!("update_cluster {dto:?} ");
            }
            ClusterAction::Delete(delete_cluster) => {
                println!("delete_cluster.type_id() {:?}", delete_cluster.type_id());
                println!("deleteCluster {delete_cluster:?} ");
                // run_command_with_spawn("just");
                // run_command_with_statuses_blocking_try1("task -a");
                // run_multiple_commands("ls");
            }
            // ClusterAction::Delete(handle_read(deleteCluster)),
            ClusterAction::Read => handle_read(),
        },
        Subcommand::Systems(cmd) => match cmd.action {
            SystemAction::Create(cmd) => {
                // cmd:
                println!("system apply here!!");
                run_command_with_spawn("kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.11/config/manifests/metallb-native.yaml");
            }
            SystemAction::Update(_) => {
                println!("system update here!!");
                run_command_with_spawn("task -a");
                run_command_with_spawn("cargo run -p clapper -r -- cluster read");

                // ClusterAction::Read;
                // let s = create_api("task -a".to_string()).await.unwrap();
            }
            SystemAction::Delete(_) => {
                println!("system delete here!!");
                run_command_with_spawn("kubectl delete -f https://raw.githubusercontent.com/metallb/metallb/v0.13.11/config/manifests/metallb-native.yaml");
            }
            SystemAction::Read => {
                run_command_with_spawn("task cargo:build");
                // let s = CreateCluster {
                //     name: "ads".to_string()
                // };
                // println!("{s:?}")
                // ClusterAction::Create()
                // CreateCluster::
                // ClusterSubcommand::default().action
                // Subcommand::Cluster(ClusterSubcommand);
            }
        },
        Subcommand::Users(cmd) => match cmd.action {
            UserAction::Create(_) => {}
            UserAction::Update(_) => {}
            UserAction::Delete(_) => {}
            UserAction::Read => {}
        },
    }
}
