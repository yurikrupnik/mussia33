mod product;
mod swagger;
mod todo;
mod user;
mod mongo; // only for docker local

use actix_cors::Cors;
use actix_web::{middleware::Logger, web, App, HttpServer, HttpResponse};
use env_logger::Env;
use mongodb::Client;
use std::env;
use swagger::{ApiDoc, ApiDoc1};
use utoipa::OpenApi;
use utoipa_swagger_ui::{SwaggerUi, Url};
// use std::fmt::Display;
// use futures::task::Spawn;
use kube::{api::{Api, ResourceExt, ListParams}, Error};
use k8s_openapi::api::core::v1::Pod;
use k8s_openapi::Metadata;
// use serde_json::Value::String;

fn print_pod_row(pod: (&str, &str, &str, i32, &str, &str, &str, &str, &str)) {
  println!("{:<35} {:<7} {:<10} {:<10} {:<5} {:<15} {:<20} {:<15} {:<15}",
           pod.0, pod.1, pod.2, pod.3, pod.4, pod.5, pod.6, pod.7, pod.8);
}

fn print_pods_wide(pod: Pod) {
  let name = pod.name_any();
  let ip = pod.status.unwrap().pod_ip.unwrap();
  // let ready = pod.status.as_ref().unwrap().container_statuses.unwrap()[0].ready;
  // let status = pod.status.unwrap().clone().container_statuses.unwrap();
  // status.as_slice().iter().for_each(|a| println!("data {:?}", a.name));
  // let ready = status[0].state.unwrap().running.unwrap();
  let name_title: &str = "NAME";
  let ready_title: &str = "READY";
  let status_title: &str = "STATUS";
  let restarts_title: &str = "RESTARTS";
  let ip_title: &str = "IP";
  let nominated_title: &str = "NOMINATED";
  let readiness_title: &str = "READINESS";
  println!("{:<35} {:<7} {:<10} {:<10} {:<15} {:<15} {:<20}",
           name_title,
           ready_title,
           status_title,
           restarts_title,
           ip_title,
           nominated_title,
           readiness_title
  );
  println!("{:<35} {:<7?} {:<10} {:<10} {:<15} {:<15} {:<20}",
           name,
           String::from("sd"),
           String::from("STATUS"),
           String::from("RESTARTS"),
           ip,
           String::from("NOMINATED NODE"),
           String::from("READINESS")
  );
}

async fn kube_data() -> Result<(), Error> {
  let client = kube::Client::try_default().await?;
  let pods: Api<Pod> = Api::default_namespaced(client);
  for p in pods.list(&ListParams::default()).await? {
    // let pod1 = ("nginx-deployment-cbdccf466-tkwsn", "1/1", "Running", 0, "47m", "10.244.0.142", "kind-control-plane", "<none>", "<none>");
    // print_pod_row(pod1);
    print_pods_wide(p);
    // println!("{:<40}",p.spec.clone().unwrap().node_name.unwrap());
    // println!("found pod in node {}", p.spec.clone().unwrap().node_name.unwrap());
    // println!("found pod in namespace {}", p.metadata.namespace.as_ref().unwrap());
    // println!("found pod {}", p.name_any());
    // let status = p.status.unwrap().container_statuses.unwrap();
    // let k = status[0].state.clone().unwrap().running;
    // println!("pod Status {:?}", k);
    // let cons = p.spec.unwrap().containers;
    // let command = cons[0].command.as_ref();
    // println!("command is {:?}", command);
    // if let Some(status.Ok()) =
  }
  Ok(())
}

async fn get_status() -> HttpResponse {
  let _ = kube_data().await;
  HttpResponse::Ok()
    .body("Healthy")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  // env::set_var("RUST_LOG", "debug");
  // env::set_var("RUST_BACKTRACE", "1");
  env_logger::init_from_env(Env::default().default_filter_or("info"));

  // let openapi = ApiDoc::openapi();
  // let openapi1 = ApiDoc1::openapi();
  let port = env::var("PORT").unwrap_or("8080".to_string()).parse::<u16>().unwrap();
  let uri = env::var("MONGO_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
  let client = Client::with_uri_str(uri).await.expect("failed to connect");
  let store = web::Data::new(todo::TodoStore::default());
  // data here
  let client_data = web::Data::new(client);

  HttpServer::new(move || {
    let cors = Cors::default()
      // .allowed_origin("http://localhost:5173")
      .allowed_origin_fn(|origin, _req_head| {
        print!("origin!! {}, url!! {}", origin.is_empty(), _req_head.uri);
        true
      })
      .allowed_methods(vec!["GET", "POST", "DELETE", "PUT"])
      .max_age(3600);
    App::new()
      .route("/status", web::get().to(get_status))
      .service(
        web::scope("/api")
          .app_data(client_data.clone())
          .service(product::add_product)
          .service(product::get_product)
          .service(product::get_products)
          .service(product::delete_product)
          .service(product::delete_products)
          .service(product::update_product)
          .configure(user::create_config_by_type::<user::User>(
            "rustApp",
            user::User::get_collection(2),
          )),
      )
      .wrap(cors)
      .wrap(Logger::default())
      .configure(todo::configure(store.clone()))
      .service(SwaggerUi::new("/swagger-ui/{_:.*}").urls(vec![
        (
          Url::new("main", "/api-docs/openapi.json"),
          ApiDoc::openapi(),
        ),
        (
          Url::with_primary("api1", "/api-docs/openapi1.json", true),
          ApiDoc1::openapi(),
        ),
      ]))
  })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
