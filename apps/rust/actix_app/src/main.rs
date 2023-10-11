mod mongo;
mod product;
mod swagger;
mod todo;
mod user; // only for docker local

use actix_cors::Cors;
use actix_web::{middleware::Logger, Scope, web, App, HttpResponse, HttpServer};
use env_logger::Env;
use mongodb::Client;
use swagger::{ApiDoc, ApiDoc1};
use utoipa::OpenApi;
use utoipa_swagger_ui::{SwaggerUi, Url};
use rust_servers_shared::{get_env_port, get_mongo_uri, get_status};

// TODO CHECK TO REMOVE AFTER CLEAN UP
use rust_books_api::{Book, books_routes};
use rust_author_api::{Author, authors_routes};

use rust_generic_api::{create_configure};
use user::{add_user, delete_user, drop_users, get_user, update_user, user_list};

fn users_service(url: String) -> Scope {
    web::scope(url.as_str())
        .service(
            web::resource("")
                .route(web::get().to(user_list))
                .route(web::delete().to(drop_users))
                .route(web::post().to(add_user)),
        )
        .service(
            web::resource("/{id}")
                .route(web::delete().to(delete_user))
                .route(web::put().to(update_user))
                .route(web::get().to(get_user)),
        )

}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // env::set_var("RUST_LOG", "debug");
    // env::set_var("RUST_BACKTRACE", "1");
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let client = Client::with_uri_str(get_mongo_uri()).await.expect("failed to connect");
    let store = web::Data::new(todo::TodoStore::default());
    // data here
    let client_data = web::Data::new(client);

    let port = get_env_port();
    log::info!("Starting HTTP server on http://localhost:{port}");

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
                    .configure(create_configure::<Book>(
                        "rustApp",
                        Book::COLLECTION,
                        books_routes()
                    ))
                    .configure(create_configure::<Author>(
                        "rustApp",
                        Author::COLLECTION,
                        authors_routes()
                    ))
                    .configure(user::create_config_by_type::<user::User>(
                        "rustApp",
                        user::User::get_collection(2),
                        users_service(format!("/{}", user::User::get_collection(2)))
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
            .default_service(web::to(HttpResponse::NotFound))
    })
    .bind(("0.0.0.0", port))?
    .workers(1) // remove me after development
    .run()
    .await
    // .map_err(|err| anyhow::anyhow!("An error occurred while running the server. {:?}", err))
}
