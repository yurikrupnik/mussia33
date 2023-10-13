mod model;
mod controller;
mod dto;
mod router;

pub mod author {
    pub use crate::model::Author;
    pub use crate::controller::*;
    pub use crate::dto::QueryParams;
    pub use crate::router::authors_routes;
}