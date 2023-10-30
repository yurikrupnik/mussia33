mod controller;
mod dto;
mod model;
mod router;

pub mod author {
    pub use crate::controller::*;
    pub use crate::dto::*;
    pub use crate::model::Author;
    pub use crate::router::authors_routes;
}
