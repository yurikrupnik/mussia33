use actix_web::{{web}, Scope};
use crate::controller::{list_author, create_author};
use crate::author::Author;

pub fn authors_routes() -> Scope {
    // let url = Author::URL;
    web::scope(Author::URL)
        .service(
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