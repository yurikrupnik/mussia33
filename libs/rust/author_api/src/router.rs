use crate::author::Author;
use crate::controller::{create_author, list_author};
use actix_web::{web, Scope};

pub fn authors_routes() -> Scope {
    // let url = Author::URL;
    web::scope(Author::URL).service(
        web::resource("")
            .route(web::get().to(list_author))
            // .route(web::delete().to(drop_users))
            .route(web::post().to(create_author)),
    )
    // .service(
    //     web::resource("/{id}")
    //         .route(web::delete().to(delete_user))
    //         .route(web::put().to(update_user))
    //         .route(web::get().to(get_user)),
    // )
}
