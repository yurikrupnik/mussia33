mod dto;
mod handlers;
mod model;
mod router;

pub mod book {
    pub use crate::dto::QueryParams;
    pub use crate::handlers::*;
    pub use crate::model::*;
    pub use crate::router::books_routes;
}
