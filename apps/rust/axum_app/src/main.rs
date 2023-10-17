use axum::{
    routing::get,
    Router,
};
use rust_servers_shared::get_port;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    let url = format!("0.0.0.0:{}", get_port());
    println!("Listening on {}", url);
    axum::Server::bind(&url.parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}