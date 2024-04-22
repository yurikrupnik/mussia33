// mod product;
// mod author;
use salvo::logging::Logger;
mod author;
mod users;
use author::author_router;
use users::user_router;
// use salvo::http::{StatusCode, StatusError};
use mongodb::Client;
use salvo::oapi::extract::*;
use salvo::oapi::{EndpointOutRegister, ToSchema};
use salvo::prelude::*;
// use tracing::instrument::WithSubscriber;
// use tracing_subscriber::fmt::format;
use rust_servers_shared::get_sql_uri;
// struct App {}
// impl App {
//     pub const TAG: &'static str = "Products";
//     fn get_tag() -> String {
//         "Tags".to_string()
//     }
// }

/// This is a summary of the operation
///
/// All lines of the doc comment will be included to operation description.
#[endpoint(status_codes(200, 409), tags("Default"))]
async fn hello(name: QueryParam<String, false>) -> String {
    format!("Hello, {}!", name.as_deref().unwrap_or("World"))
}

#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize, ToSchema)]
struct Todo {
    id: u64,
    text: String,
    completed: bool,
}

/// This is a summary of the operation
///
/// All lines of the doc comment will be included to operation description.
#[endpoint(status_codes(200, 409), tags("Default"))]
async fn hallo(name: QueryParam<String, false>) -> String {
    format!("Hallo, {}!", name.as_deref().unwrap_or("World"))
}

fn new_route() -> Router {
    Router::with_path("/api")
        .hoop(Logger::new())
        .push(user_router())
        .push(author_router())
        .push(Router::with_path("hello").get(hello))
        .push(Router::with_path("hallo").get(hallo))
}

use mongodb::{options::ClientOptions, Client as MongoClient};
use once_cell::sync::OnceCell;
use sqlx::{PgPool, Pool};

pub static DB_POOL: OnceCell<PgPool> = OnceCell::new();
pub fn db_pool<'a>() -> &'a PgPool {
    DB_POOL.get().unwrap()
}

pub static MONGO_POOL: OnceCell<MongoClient> = OnceCell::new();

pub fn mongo_pool<'a>() -> &'a MongoClient {
    MONGO_POOL.get().unwrap()
}

pub async fn make_db_pool(db_url: &str) -> PgPool {
    Pool::connect(db_url).await.unwrap()
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().init();
    let sql_url = get_sql_uri();
    println!("sql_url: {}", sql_url);
    let pool = make_db_pool(&get_sql_uri()).await;
    DB_POOL.set(pool).unwrap();
    let uri = std::env::var("MONGO_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    MONGO_POOL.set(client).unwrap();
    //   let s= MONGO_POOL.get().unwrap();
    // s.database("Ds").collection();
    let router = Router::new()
        // .hoop(CachingHeaders::new())
        // .hoop(Compression::new().min_length(0))
        .push(new_route())
        .push(Router::with_path("hello").get(hello));

    let doc = OpenApi::new("Salvo Api", "0.0.1").merge_router(&router);

    let router = router
        .push(doc.into_router("/api-doc/openapi.json"))
        .push(SwaggerUi::new("/api-doc/openapi.json").into_router("swagger-ui"));

    // let tcp_str = format!("0.0.0.0:{}", 8080);
    let acceptor = TcpListener::new("0.0.0.0:8080").bind().await;
    Server::new(acceptor).serve(router).await;
}
