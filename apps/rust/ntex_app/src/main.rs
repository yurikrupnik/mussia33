mod shared;
mod users;
mod users_mongo;

use bb8::Pool;
use bb8_redis::bb8;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use mongodb::Client;
use ntex::web::{self, HttpResponse, Responder};
use rust_servers_shared::{get_port, postgres::create_pool};
use shared::app_state::AppState;
use shared::redis::{publish::publish_message, subscribe::subscribe_to_channel};
use std::net::Ipv4Addr;
use users::config::user_routes;
use users_mongo::config::user_routes as user_routes_mongo;
use utoipa::OpenApi;
// use utoipa_rapidoc::RapiDoc;
// use utoipa_redoc::{Redoc, Servable};
// use utoipa_swagger_ui::SwaggerUi;

// const API_KEY_NAME: &str = "todo_apikey";
// const API_KEY: &str = "utoipa-rocks";

#[web::get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[ntex::main]
async fn main() -> std::io::Result<()> {
    #[derive(OpenApi)]
    #[openapi(
    paths(
    ),
    components(
    ),
    tags(
    (name = "todo", description = "Todo items management API")
    )
    )]
    struct ApiDoc;

    std::env::set_var("RUST_LOG", "ntex=info");
    env_logger::init();

    let uri = std::env::var("MONGO_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    let db = client.database("aris");

    let redis_uri = std::env::var("REDIS_HOST").unwrap_or_else(|_| "localhost:6379".into());
    let manager = RedisConnectionManager::new(redis_uri).unwrap();
    // let manager = RedisConnectionManager::new("redis://localhost").unwrap();
    let redis_pool = Pool::builder().build(manager).await.unwrap();

    let u = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://myuser:mypassword@localhost/mydatabase".into());
    println!("postgres url: {u}");
    let pool = create_pool(Some(&u), None)
        .await
        .expect("Failed to create pool");

    let sub_channel_name = "my_channel".to_string();
    tokio::spawn(async move {
        subscribe_to_channel(&sub_channel_name).await.unwrap();
    });

    // Small delay to ensure the subscriber is ready (not ideal in production)
    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;

    // Publish a message
    if let Err(e) = publish_message(&redis_pool, "my_channel", "Hello, world!").await {
        println!("Error publishing message: {}", e);
    }

    let state = AppState::new(pool, db, redis_pool);
    // let state = AppState::new(pool, db, redis_pool);

    web::HttpServer::new(move || {
        let json_config = web::types::JsonConfig::default().limit(4096);
        web::App::new()
            // .service(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
            // .service(Redoc::with_url("/redoc", ApiDoc::openapi()))
            // .service(Redoc::with_url("/redoc", ApiDoc::openapi.clone()))
            .wrap(web::middleware::Logger::default())
            .state(json_config)
            // .state(redis_pool.clone())
            // .state(client.clone())
            .state(state.clone())
            .service(hello)
            .configure(user_routes)
            .configure(user_routes_mongo)
        // .default_service()
    })
    .bind((Ipv4Addr::UNSPECIFIED, get_port()))?
    .workers(1)
    .run()
    .await
}

#[cfg(test)]
mod tests {
    use ntex::web;
    use ntex::web::test;

    use super::*;
    // #[ntex::test]
    // async fn test_index_get() {
    //     let app = test::init_service(web::App::new().route("/", web::get().to(index))).await;
    //     let req = test::TestRequest::get().uri("/").to_request();
    //     let resp = test::call_service(&app, req).await;
    //     assert!(resp.status().is_success());
    // }
    //
    // #[ntex::test]
    // async fn test_index_post() {
    //     let app = test::init_service(web::App::new().route("/", web::get().to(index))).await;
    //     let req = test::TestRequest::post().uri("/").to_request();
    //     let resp = test::call_service(&app, req).await;
    //     assert!(resp.status().is_client_error());
    // }
}
// #[ntex::main]
// async fn main() -> std::io::Result<()> {
//     env_logger::init();
//
//     #[derive(OpenApi)]
//     #[openapi(
//     paths(
//     ),
//     components(
//     ),
//     tags(
//     ),
//     )]
//     struct ApiDoc;
//
//     // let store = Data::new(TodoStore::default());
//     // Make instance variable of ApiDoc so all worker threads gets the same instance.
//     let openapi = ApiDoc::openapi();
//
//     web::HttpServer::new(|| {
//         web::App::new()
//             .wrap(middleware::Logger::default())
//             .wrap(middleware::DefaultHeaders::new().header("X-Version", "0.2"))
//                     // .service(Redoc::with_url("/redoc", openapi.clone()))
//                     // .service(
//                     //     SwaggerUi::new("/swagger-ui/{_:.*}").url("/api-docs/openapi.json", openapi.clone()),
//                     // )
//                     // // There is no need to create RapiDoc::with_openapi because the OpenApi is served
//                     // // via SwaggerUi. Instead we only make rapidoc to point to the existing doc.
//                     // //
//                     // // If we wanted to serve the schema, the following would work:
//                     // // .service(RapiDoc::with_openapi("/api-docs/openapi2.json", openapi.clone()).path("/rapidoc"))
//                     // .service(RapiDoc::new("/api-docs/openapi.json").path("/rapidoc"))
//             .route(
//             "/",
//             web::get().to(|| async { web::HttpResponse::Ok().finish() }),
//         )
//
//     })
//         .bind((Ipv4Addr::UNSPECIFIED, 8080))?
//         .run()
//         .await;
// }
