use axum::{http::StatusCode, response::IntoResponse, routing::get, Router};
use rust_servers_shared::get_port;
// use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    // tracing_subscriber::registry()
    //   .with(
    //     tracing_subscriber::EnvFilter::try_from_default_env()
    //       .unwrap_or_else(|_| "example_global_404_handler=info".into()),
    //   )
    //   .with(tracing_subscriber::fmt::layer())
    //   .init();
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .route("/f", get(|| async { "g Shit!!" }))
        .fallback(handler_404);

    let url = format!("0.0.0.0:{}", get_port());
    println!("Listening on {}", url);
    // run it
    // let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
    //   .await
    //   .unwrap();
    // tracing::debug!("listening on {}", listener.local_addr().unwrap());
    // axum::serve(listener, app).await.unwrap();
    axum::Server::bind(&url.parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "nothing to see here")
}
