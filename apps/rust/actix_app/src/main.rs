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

async fn get_status() -> HttpResponse {
  HttpResponse::Ok()
    .body("data")
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
