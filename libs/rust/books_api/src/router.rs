use actix_web::{{web}, Scope};
use crate::handlers::{list_book, create_book};
use crate::model::Book;

pub fn books_routes() -> Scope {
    let url = Book::COLLECTION;
    web::scope(format!("/{url}").as_str())
        .service(
            web::resource("")
                .route(web::get().to(list_book))
                // .route(web::delete().to(drop_users))
                .route(web::post().to(create_book)),
        )
        // .service(
        //     web::resource("/{id}")
        //         .route(web::delete().to(delete_user))
        //         .route(web::put().to(update_user))
        //         .route(web::get().to(get_user)),
        // )
}