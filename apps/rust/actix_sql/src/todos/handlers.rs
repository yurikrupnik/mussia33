use actix_web::{
    HttpResponse, Responder,
    web::{Data, Json, Path},
};
use sqlx::{query_as, query};
use super::model::{Todo, CreateTodo, UpdateTodo};
use crate::Store;
use crate::generic::{handle_result, handle_create_result};

// enum QueryType {
//     All,
//     One,
// }

// struct Queries {
//     // read: String,
//     // list: String,
//     // delete: String,
//     // delete_list: String,
//     // params: HashMap<String, String>,
// }
//
// impl<'a, T> Queries{
//     fn read() -> &'a str {
//         &format!("SELECT * FROM {}", T::COLLECTION)
//     }
// }

// use std::collections::HashMap;
// use std::string::ToString;
//
// enum QueryType {
//     Item = 1,
//     // List,
//     // Delete,
//     // DeleteList,
//     // Params(HashMap<String, String>),
// }
// fn queries<T>(query: QueryType) {
//     let mut hash = HashMap::new();
//     hash.insert("list", &format!("SELECT * FROM {}", Todo::COLLECTION));
//     // hash.insert(&QueryType::Item, &format!("SELECT * FROM {}", Todo::COLLECTION));
//
//     //
//     // match query {
//     //     QueryType::Item => &format!("SELECT * FROM {}", T::COLLECTION),
//     //     // QueryType::List => {todo!("SELECT * FROM {}", T::COLLECTION)},
//     //     // QueryType::Delete => {},
//     //     // QueryType::DeleteList => {},
//     // }
// }



pub async fn get_todos(app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Todo>(
        &format!("SELECT * FROM {}", Todo::COLLECTION)
    )
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
        },
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

pub async fn create_todo(body: Json<CreateTodo>, app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Todo>(
        &format!("INSERT INTO {} (title) VALUES ($1) RETURNING *", Todo::COLLECTION)
    )
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
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

pub async fn update_todo(app_state: Data<Store>, id: Path<i16>, body: Json<UpdateTodo>) -> impl Responder {
    let item_id = id.into_inner();
    let result = sqlx::query_as::<_, Todo>(&format!(
        "UPDATE {} SET completed = $1 WHERE id = $2 RETURNING *", Todo::COLLECTION)
    )
        .bind(body.completed)
        .bind(item_id)
        .fetch_one(&app_state.pool)
        .await;

    handle_result(result)
    // match result {
    //     Ok(payload) => HttpResponse::Ok().json(payload),
    //     Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    // }
}
