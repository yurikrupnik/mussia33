use actix_web::{
    web::{ServiceConfig, scope, get, put, post, delete, resource},
};
use super::handlers::*;
use super::model::Book;

pub fn book_configure(cfg: &mut ServiceConfig) {
    cfg.service(
        scope(Book::URL)
            .service(
                resource("")
                    .route(get().to(get_books))
                    .route(delete().to(drop_books))
                    .route(post().to(create_book)),
            )
            .service(
                resource("/{id}")
                    .route(delete().to(delete_book))
                    .route(put().to(update_book))
                    .route(get().to(get_book)),
            )
    );
}