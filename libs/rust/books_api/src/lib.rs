mod model;
mod handlers;
mod dto;
mod router;

pub mod book {
    pub use crate::model::Book;
    pub use crate::handlers::*;
    pub use crate::dto::QueryParams;
    pub use crate::router::books_routes;
}