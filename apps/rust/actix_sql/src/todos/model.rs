use rust_proc_macros::{DbResource, Reflective};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(FromRow, Deserialize, Serialize, Debug)]
#[serde(deny_unknown_fields)]
#[serde(rename_all = "camelCase")]
#[derive(DbResource)]
pub struct Todo {
    pub id: i32,
    pub title: String,
    pub completed: bool,
}

#[derive(Deserialize, Serialize, Debug, Reflective)]
pub struct CreateTodo {
    pub title: String,
    pub completed: bool,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UpdateTodo {
    // pub title: String,
    pub completed: bool,
}
