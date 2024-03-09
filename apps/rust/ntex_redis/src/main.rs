mod app_state;

use app_state::AppState;
use bb8::Pool;
use bb8_redis::RedisConnectionManager;
use mongodb::Client;
use ntex::web;
use std::net::Ipv4Addr;

#[web::get("/")]
async fn hello() -> impl web::Responder {
    web::HttpResponse::Ok().body("Hello world!")
}

#[web::post("/echo")]
async fn echo(req_body: String) -> impl web::Responder {
    web::HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl web::Responder {
    web::HttpResponse::Ok().body("Hey there!")
}

#[ntex::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "ntex=info");
    env_logger::init();

    let uri = std::env::var("MONGO_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    let db = client.database("aris");

    let manager = RedisConnectionManager::new("redis://localhost").unwrap();
    let redis_pool = Pool::builder().build(manager).await.unwrap();

    let state = AppState::new(db, redis_pool);

    web::HttpServer::new(move || {
        let json_config = web::types::JsonConfig::default().limit(4096);
        web::App::new()
            .wrap(web::middleware::Logger::default())
            .state(json_config)
            .state(state.clone())
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind((Ipv4Addr::UNSPECIFIED, 8081))?
    .workers(1)
    .run()
    .await
}
