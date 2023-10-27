use actix_web::{
    middleware::Logger,
    web::{
        to, get, Data
    },
    App, HttpResponse, HttpServer
};
use rust_servers_shared::{
    get_port, postgres::create_pool,
    actix::{get_status, set_cors, set_logger}
};

mod todos;
mod books;
mod generic;
mod store;
mod routes;
use store::{Store};
use todos::todo_configure;
use books::book_configure;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    set_logger(None);
    let pool = create_pool(None, None).await.expect("Failed to create pool");
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
        .workers(1) // remove me after development
        .run()
        .await
}
