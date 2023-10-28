use super::model::{CreateTodo, Todo, UpdateTodo};
use crate::generic::{handle_create_result, handle_result};
use crate::Store;
use actix_web::{
    web::{Data, Json, Path},
    HttpResponse, Responder,
};
use rust_proc_macros::{DbResource, Reflective};
use sqlx::{query, query_as};

pub async fn get_todos(app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Todo>(&format!("SELECT * FROM {}", Todo::COLLECTION))
        .fetch_all(&app_state.pool)
        .await;
    handle_result(result)
}

pub async fn get_todo(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query_as::<_, Todo>(&format!("SELECT * FROM {} where id = $1", Todo::COLLECTION))
        .bind(item_id)
        .fetch_one(&app_state.pool)
        .await;

    handle_result(result)
}

pub async fn delete_todo(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query(&format!("DELETE FROM {} WHERE id = $1", Todo::COLLECTION))
        .bind(item_id)
        .execute(&app_state.pool)
        .await;
    match result {
        Ok(result) => {
            if result.rows_affected() > 0 {
                HttpResponse::Ok().json(format!("Deleted item with ID: {}", item_id))
            } else {
                HttpResponse::NotFound().json(format!("Item with ID: {} not found", item_id))
            }
        }
        Err(e) => HttpResponse::InternalServerError().json(e.to_string()),
    }
}

fn create_query_keys(acc: String, s: &&str) -> String {
    if acc.is_empty() {
        return acc + s;
    }
    acc + "," + s
}

// fn create_query<'a, T: impl Reflective>(keys_string: String) -> &'a str {
//     &format!("INSERT INTO {} ({}) VALUES ($1, false) RETURNING *", T::COLLECTION, keys_string)
// }

pub async fn create_todo(body: Json<CreateTodo>, app_state: Data<Store>) -> impl Responder {
    let keys = CreateTodo::field_names()
        .iter()
        .fold(String::new(), create_query_keys);

    let query = &format!(
        "INSERT INTO {} ({}) VALUES ($1, false) RETURNING *",
        Todo::COLLECTION,
        keys
    );
    let result = query_as::<_, Todo>(query)
        .bind(&body.title)
        .fetch_one(&app_state.pool)
        .await;

    handle_create_result(result)
}

pub async fn drop_todos(app_state: Data<Store>) -> impl Responder {
    let result = sqlx::query(&format!("DELETE FROM {}", Todo::COLLECTION))
        .execute(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload.rows_affected()),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string()),
    }
}

pub async fn update_todo(
    app_state: Data<Store>,
    id: Path<i16>,
    body: Json<UpdateTodo>,
) -> impl Responder {
    let item_id = id.into_inner();
    let result = sqlx::query_as::<_, Todo>(&format!(
        "UPDATE {} SET completed = $1 WHERE id = $2 RETURNING *",
        Todo::COLLECTION
    ))
    .bind(body.completed)
    .bind(item_id)
    .fetch_one(&app_state.pool)
    .await;

    handle_result(result)
}
