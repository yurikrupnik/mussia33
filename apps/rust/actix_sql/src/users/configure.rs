use super::handlers::*;
use super::model::User;
use actix_web::web::{delete, get, post, put, resource, scope, ServiceConfig};
use rust_proc_macros::DbResource;

pub fn user_configure(cfg: &mut ServiceConfig) {
    cfg.service(
        scope(User::URL)
            .service(
                resource("")
                    .route(get().to(get_users))
                    .route(delete().to(drop_users))
                    .route(post().to(create_user)),
            )
            .service(
                resource("/{id}")
                    .route(delete().to(delete_user))
                    .route(put().to(update_user))
                    .route(get().to(get_user)),
            ),
    );
}
