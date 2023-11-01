use actix_web::{
    middleware::Logger,
    web::{get, to, Data},
    App, HttpResponse, HttpServer,
};
use rust_servers_shared::{
    actix::{get_status, set_cors, set_logger},
    get_port,
    postgres::create_pool,
};

mod books;
mod generic;
mod routes;
mod store;
mod todos;
use books::book_configure;
use store::Store;
use todos::todo_configure;

// use tracing_subscriber;
// use tracing::info;
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    set_logger(None);
    // std::env::set_var("RUST_LOG", "debug");
    // tracing_subscriber::fmt().json().init();
    // tracing_subscriber::fmt::init();
    let pool = create_pool(None, None)
        .await
        .expect("Failed to create pool");
    let app_state = Store::new(pool);
    let port = get_port();
    log::info!("Starting HTTP server on http://localhost:{port}");
    HttpServer::new(move || {
        App::new()
            .wrap(set_cors())
            .wrap(Logger::default())
            .route("/health", get().to(get_status))
            .app_data(Data::new(app_state.clone()))
            .configure(todo_configure)
            .configure(book_configure)
            .default_service(to(HttpResponse::NotFound))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
