use actix_web::{
    web::{ServiceConfig, scope, get, put, post, delete, resource},
};
use super::handlers::*;
use super::model::Todo;

pub fn todo_configure(cfg: &mut ServiceConfig) {
    cfg.service(
        scope(Todo::URL)
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
    );
}