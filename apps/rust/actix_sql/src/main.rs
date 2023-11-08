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
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;
mod swagger;
mod users;

mod books;
mod generic;
mod routes;
mod store;
mod todos;
use books::book_configure;
use store::Store;
use swagger::ApiDoc;
use todos::todo_configure;
use users::user_configure;

mod extractors;
// use extractors::Auth;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    set_logger(None);
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
            .configure(user_configure)
            .service(
                SwaggerUi::new("/swagger-ui/{_:.*}")
                    .url("/api-docs/openapi.json", ApiDoc::openapi()),
            )
            .default_service(to(HttpResponse::NotFound))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
