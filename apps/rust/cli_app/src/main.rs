// use serde_json::Value::String;

fn main() {
    let app_name = String::new();
    println!("Hello from {app_name:?}");
}

// // use clap::{App, Arg};
// // use axum::{routing::get, Router};
//
// #[derive(clap::Parser)]
// #[clap(author, version, about, long_about = None)]
// struct Cli {
//   #[clap(subcommand)]
//   command: Command,
// }
//
// #[derive(clap::Subcommand)]
// enum Command {
//   Project(ProjectCommand),
//   LocalEnv(LocalEnvCommand),
//   Company(CompanyCommand),
// }
//
// // use actix_web::{web, HttpResponse, Result};
// //
// // use actix_web::{web, App, HttpServer};
// //
// // #[actix_web::main]
// // async fn main() -> std::io::Result<()> {
// //   let app = App::new().service(web::resource("/project").route(web::post().to(handle_project_create)));
// //
// //   let server = HttpServer::new(app).bind("localhost:8080").unwrap();
// //
// //   server.run().await
// // }
//
// #[derive(clap::Parser)]
// struct ProjectCommand {
//   #[clap(subcommand)]
//   action: ProjectAction,
// }
//
// #[derive(clap::Subcommand)]
// enum ProjectAction {
//   Create(ProjectCreate),
//   Read(ProjectRead),
//   Update(ProjectUpdate),
//   Delete(ProjectDelete),
// }
//
// #[derive(clap::Parser)]
// struct ProjectCreate {
//   #[clap(long, short, value_parser)]
//   name: String,
// }
//
// #[derive(clap::Parser)]
// struct ProjectRead {
//   #[clap(long, short, value_parser)]
//   id: i32,
// }
//
// #[derive(clap::Parser)]
// struct ProjectUpdate {
//   #[clap(long, short, value_parser)]
//   id: i32,
//   #[clap(long, short, value_parser)]
//   name: String,
// }
//
// #[derive(clap::Parser)]
// struct ProjectDelete {
//   #[clap(long, short, value_parser)]
//   id: i32,
// }
//
// #[derive(clap::Parser)]
// struct LocalEnvCommand {
//   #[clap(subcommand)]
//   action: LocalEnvAction,
// }
//
// #[derive(clap::Parser)]
// enum LocalEnvAction {
//   Create(LocalEnvCreate),
//   Read(LocalEnvRead),
//   Update(LocalEnvUpdate),
//   Delete(LocalEnvDelete),
// }
//
// #[derive(clap::Parser)]
// struct LocalEnvCreate {
//   #[clap(long, short, value_parser)]
//   name: String,
// }
//
// #[derive(clap::Parser)]
// struct LocalEnvRead {
//   #[clap(long, short, value_parser)]
//   id: i32,
// }
//
// #[derive(clap::Parser)]
// struct LocalEnvUpdate {
//   #[clap(long, short, value_parser)]
//   id: i32,
//   #[clap(long, short, value_parser)]
//   name: String,
// }
//
// #[derive(clap::Parser)]
// struct LocalEnvDelete {
//   #[clap(long, short, value_parser)]
//   id: i32,
// }
//
// #[derive(clap::Parser)]
// struct CompanyCommand {
//   #[clap(subcommand)]
//   action: CompanyAction,
// }
//
// #[derive(clap::Parser)]
// enum CompanyAction {
//   Create(CompanyCreate),
//   Read(CompanyRead),
//   Update(CompanyUpdate),
//   Delete(CompanyDelete),
// }
//
// #[derive(clap::Parser)]
// struct CompanyCreate {
//   #[clap(long, short, value_parser)]
//   name: String,
// }
//
// #[derive(clap::Parser)]
// struct CompanyRead {
//   #[clap(long, short, value_parser)]
//   id: i32,
// }
//
// #[derive(clap::Parser)]
// struct CompanyUpdate {
//   #[clap(long, short, value_parser)]
//   id: i32,
//   #[clap(long, short, value_parser)]
//   name: String,
// }
//
// #[derive(clap::Parser)]
// struct CompanyDelete {
//   #[clap(long, short, value_parser)]
//   id: i32,
// }
//
// async fn handle_project_create(ctx: axum::extract::Extension<ProjectService>) -> axum::Json<Project> {
//   let project_create = ctx.request().json::<ProjectCreate>().await?;
//
//   let project = ctx.ext().create_project(project_create.name).await?;
//
//   axum::Json(project)
// }
//
// async fn handle_project_create(ctx: axum::extract::
