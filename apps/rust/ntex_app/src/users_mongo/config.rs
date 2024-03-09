use crate::users_mongo::handlers::{
    create_user, delete_user, drop, get_user, get_users, update_user,
};
use ntex::web;

pub fn user_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/user-m").service((
            web::resource("")
                .route(web::delete().to(drop))
                .route(web::get().to(get_users))
                .route(web::post().to(create_user)),
            web::resource("/{id}")
                .route(web::get().to(get_user))
                .route(web::put().to(update_user))
                .route(web::delete().to(delete_user)),
        )),
    );
}
