use actix_web::{
    HttpResponse, Responder,
    web::{Data, Json, Path},
};
use sqlx::{query_as, query};
use super::model::{Book, CreateBook, UpdateBook};
use crate::Store;
use crate::generic::{handle_result, handle_create_result};

pub async fn get_books(app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Book>(
        &format!("SELECT * FROM {}", Book::COLLECTION)
    )
        .fetch_all(&app_state.pool)
        .await;
    handle_result(result)
}

pub async fn get_book(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query_as::<_, Book>(&format!("SELECT * FROM {} where id = $1", Book::COLLECTION))
        .bind(item_id)
        .fetch_one(&app_state.pool)
        .await;

    handle_result(result)
}

pub async fn delete_book(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query(&format!("DELETE FROM {} WHERE id = $1", Book::COLLECTION))
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

pub async fn create_book(body: Json<CreateBook>, app_state: Data<Store>) -> impl Responder {
    let result = query_as::<_, Book>(
        &format!("INSERT INTO {} (title, author, description) VALUES ($1,$2,$3) RETURNING *", Book::COLLECTION)
    )
        .bind(&body.title)
        .bind(&body.author)
        .bind(&body.description)
        .fetch_one(&app_state.pool)
        .await;

    handle_create_result(result)
}

pub async fn drop_books(app_state: Data<Store>) -> impl Responder {
    let result = sqlx::query(&format!("DELETE FROM {}", Book::COLLECTION))
        .execute(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload.rows_affected()),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

pub async fn update_book(app_state: Data<Store>, id: Path<i16>, body: Json<UpdateBook>) -> impl Responder {
    let item_id = id.into_inner();
    let result = sqlx::query_as::<_, Book>(&format!(
        "UPDATE {} SET title = $1 WHERE id = $2 RETURNING *", Book::COLLECTION)
    )
        // .bind(body.title)
        .bind(item_id)
        .fetch_one(&app_state.pool)
        .await;

    match result {
        Ok(payload) => HttpResponse::Ok().json(payload),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}
