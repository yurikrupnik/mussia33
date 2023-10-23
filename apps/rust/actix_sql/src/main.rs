use actix_web::{
    web::{
        to, scope, resource, get, post, put, delete, Path, Data, Json
    },
    App, HttpResponse, HttpServer, Responder
};
use env_logger::Env;
use sqlx::{
    Pool, Postgres, query_as, query,
    postgres::PgPoolOptions
};
use rust_servers_shared::{get_port, get_status, get_sql_uri};

mod store;
mod routes;
use store::{Store, Todo, CreateTodo, UpdateTodo};
// use routes::configure;


async fn get_todos(app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Todo>("SELECT * FROM todos")
        .fetch_all(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload),
        Err(err) => HttpResponse::InternalServerError().json(err.to_string())
    }
}

async fn get_todo(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query_as::<_, Todo>("SELECT * FROM todos where id = $1")
        .bind(item_id)
        .fetch_one(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload),
        Err(err) => HttpResponse::InternalServerError().json(err.to_string())
    }
}

async fn delete_todo(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query("DELETE FROM todos WHERE id = $1")
        .bind(item_id)
        .execute(&app_state.pool)
        .await;
    match result {
        Ok(result) => {
            if result.rows_affected() > 0 {
                HttpResponse::Ok().json(format!("Deleted item with ID: {}", item_id))
            } else {
                HttpResponse::NotFound().json(format!("Item with ID: {} not found", item_id))
            }
        },
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

async fn create_todo(body: Json<CreateTodo>, app_state: Data<Store>) -> impl Responder {
    let created = query_as::<_, Todo>(
        "INSERT INTO todos(title) VALUES($1) RETURNING *"
    )
        .bind(&body.title)
        .fetch_one(&app_state.pool)
        .await;

    match created {
        Ok(item,) => HttpResponse::Ok().json(item),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

async fn drop_todos(app_state: Data<Store>) -> impl Responder {
    let table_name = "todos";
    let result = sqlx::query(&format!("DELETE FROM {}", table_name))
        .execute(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload.rows_affected()),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

async fn update_todo(app_state: Data<Store>, id: Path<i16>, body: Json<UpdateTodo>) -> impl Responder {
    let table_name = "todos";
    let item_id = id.into_inner();
    let result = sqlx::query_as::<_, Todo>(&format!("UPDATE {} SET completed = $1 WHERE id = $2 RETURNING *", table_name))
        .bind(body.completed)
        .bind(item_id)
        .fetch_one(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

async fn create_pool(url: &str) -> Result<Pool<Postgres>, sqlx::Error> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(url).await?;
    Ok(pool)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    let pool = create_pool(&get_sql_uri()).await.expect("Failed to create pool");
    let app_state = Store::new(pool);
    let port = get_port();
    log::info!("Starting HTTP server on http://localhost:{port}");
    HttpServer::new(move || {
        App::new()
            .route("/health", get().to(get_status))
            .app_data(Data::new(app_state.clone()))
            .service(
                scope("/api")
                    // configure(configure())
                    .service(
                        scope("/todo")
                            .service(
                                resource("")
                                    .route(get().to(get_todos))
                                    .route(delete().to(drop_todos))
                                    .route(post().to(create_todo)),
                            )
                            .service(
                                resource("/{id}")
                                    .route(delete().to(delete_todo))
                                    .route(put().to(update_todo))
                                    .route(get().to(get_todo)),
                            )
                    )
            )
            .default_service(to(HttpResponse::NotFound))

    })
        .bind(("0.0.0.0", port))?
        .workers(1) // remove me after development
        .run()
        .await
}
