use mongodb::Client;
use env_logger::Env;
use rust_servers_shared::{get_env_port, get_mongo_uri, get_status};
use actix_web::{middleware::{Logger, Compress}, web, App, HttpResponse, HttpServer, Result};
use rust_projects::{projects_router};
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let client = Client::with_uri_str(get_mongo_uri()).await.expect("failed to connect");
    let client_data = web::Data::new(client);

    let port = get_env_port();
    log::info!("Starting HTTP server on http://localhost:{port}");
    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(Compress::default())
            .route("/health", web::get().to(get_status))
            .service(
                web::scope("/api")
                    .app_data(client_data.clone())
                    // .configure(projects_config)
                    .service(projects_router())
                    // .service(web::resource("/projects").route(web::get().to(projects_list)))
                    // .service(product::get_product)
                    // .service(product::get_products)
                    // .service(product::delete_product)
                    // .service(product::delete_products)
                    // .service(product::update_product)
                    // .configure(user::create_config_by_type::<user::User>(
                    //     "rustApp",
                    //     user::User::get_collection(2),
                    // )),
            )
            .configure(app_config)
            .default_service(web::to(HttpResponse::NotFound))
    })
        .bind(("0.0.0.0", port))?
        .workers(1) // remove me after development
        .run()
        .await
}

fn app_config(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("")
            .service(web::resource("/").route(web::get().to(index)))
            // .service(web::resource("/post1").route(web::post().to(handle_post_1)))
            // .service(web::resource("/post2").route(web::post().to(handle_post_2)))
            // .service(web::resource("/post3").route(web::post().to(handle_post_3))),
    );
}

async fn index() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(include_str!("../static/index.html")))
}
