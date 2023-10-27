use serde::{Serialize, Deserialize};
use sqlx::FromRow;

#[derive(FromRow, Deserialize, Serialize, Debug)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "camelCase")]
pub struct Todo {
    pub id: i32,
    pub title: String,
    pub completed: bool
}

impl Todo {
    pub const URL: &'static str = "/api/todo";
    pub const COLLECTION: &'static str = "todos";
    pub const TAG: &'static str = "Todos";
}

trait Queries {
    // fn read(&self) -> &'static str {
    //     // &format!("SELECT * FROM {}", self::COLLECTION)
    // }
    // fn list() -> &'static str;
    // fn delete() -> &'static str;
    // fn delete_list() -> &'static str;
    // fn params() -> &'static str;
}

#[derive(Deserialize, Serialize, Debug)]
pub struct CreateTodo {
    pub title: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UpdateTodo {
    // pub title: String,
    pub completed: bool,
}