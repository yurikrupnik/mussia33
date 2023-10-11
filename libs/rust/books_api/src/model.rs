use plurals::{Lang, Plural};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{ToSchema};
use validator::Validate;
use rust_generic_api::Id;

/// Request to update existing `Book` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize, Validate, TS)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub struct Book {
    #[serde(flatten)]
    pub id: Id,
    #[schema(default = "Moby Dick")]
    #[validate(length(min = 2))]
    pub title: String,
    #[schema(default = "Richard Bentley")]
    pub publisher: String,
    #[schema(default = "English")]
    pub language: String,
}

impl Book {
    pub const COLLECTION: &'static str = "book";
    pub fn get_collections<'a>(num: u8) -> &'a str {
        const FOOT: Lang = Lang::En {
            singular: "book",
            plural: "books",
        };
        FOOT.fmt(num)
    }
}
