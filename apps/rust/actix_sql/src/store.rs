use serde::{Serialize, Deserialize};
use serde::de::value::StrDeserializer;
use sqlx::{PgPool, query_as, FromRow};

#[derive(FromRow, Deserialize, Serialize, Debug)]
pub struct Todo {
    pub id: i32,
    pub title: String,
    pub completed: bool,
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

#[derive(FromRow, Deserialize, Serialize, Debug)]
pub struct Book {
    pub id: i32,
    pub title: String,
    pub author: String,
    pub description: String,
}

impl Todo {
    pub fn new(id: i32, title: String, completed: bool) -> Self {
        Self {
            id,
            title,
            completed,
        }
    }

}

#[derive(Clone)]
pub(crate) struct Store {
    pub pool: PgPool,
}

impl Store {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
    //
    // pub async fn add_todo_and_return_all(
    //     &self,
    //     title: String,
    // ) -> Result<Vec<Todo>, sqlx::Error> {
    //     query_as!(
    //         Todo,
    //         r#"
    //         with inserted as (
    //             insert into todos (title)
    //             values ($1)
    //             returning id, title, completed
    //         )
    //         select id "id!", title "title!", completed "completed!"
    //         from todos
    //         union all
    //         select id "id!", title "title!", completed "completed!" from inserted
    //         order by "id!"
    //         "#,
    //         title
    //     )
    //         .fetch_all(&self.pool)
    //         .await
    // }
    //
    // pub async fn get_todos(&self) -> Result<Vec<Todo>, sqlx::Error> {
    //     query_as!(
    //         Todo,
    //         r#"
    //         select id, title, completed
    //         from todos
    //         order by id
    //         "#,
    //     )
    //         .fetch_all(&self.pool)
    //         .await
    // }
    //
    // pub async fn delete_todo_and_return_all(
    //     &self,
    //     id: i32,
    // ) -> Result<Vec<Todo>, sqlx::Error> {
    //     query_as!(
    //         Todo,
    //         r#"
    //         with delete as (
    //             delete from todos
    //             where id = $1
    //         )
    //         select id, title, completed
    //         from todos where id != $1
    //         order by id
    //         "#,
    //         id
    //     )
    //         .fetch_all(&self.pool)
    //         .await
    // }
    //
    // pub async fn update_todo_and_return_all(
    //     &self,
    //     id: i32,
    //     title: String,
    //     completed: bool,
    // ) -> Result<Vec<Todo>, sqlx::Error> {
    //     query_as!(
    //         Todo,
    //         r#"
    //         with update_todo as (
    //             update todos
    //             set title = $1, completed = $2
    //             where id = $3
    //             returning id, title, completed
    //         )
    //         select id "id!", title "title!", completed "completed!"
    //         from todos where id != $3
    //         union all
    //         select id "id!", title "title!", completed "completed!" from update_todo
    //         order by "id!"
    //         "#,
    //         title,
    //         completed,
    //         id
    //     )
    //         .fetch_all(&self.pool)
    //         .await
    // }
}