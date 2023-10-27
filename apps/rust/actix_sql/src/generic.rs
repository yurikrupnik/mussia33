
use serde::Serialize;
use actix_web::HttpResponse;
// use sqlx::Result;

pub fn handle_result<T>(result: Result<T, sqlx::Error>) -> HttpResponse
    where
        T: Serialize,
{
    match result {
        Ok(payload) => HttpResponse::Ok().json(payload),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

pub fn handle_create_result<T>(result: Result<T, sqlx::Error>) -> HttpResponse
    where
        T: Serialize,
{
    match result {
        Ok(item,) => HttpResponse::Created().json(item),
        Err(e) => HttpResponse::InternalServerError().json(e.to_string())
    }
}

// pub fn handle_delete_result(result: Result<T, sqlx::Error>, item_id: ) -> HttpResponse {
//     match result {
//         Ok(result) => {
//             if result.rows_affected() > 0 {
//                 HttpResponse::Ok().json(format!("Deleted item with ID: {}", item_id))
//             } else {
//                 HttpResponse::NotFound().json(format!("Item with ID: {} not found", item_id))
//             }
//         },
//         Err(e) => HttpResponse::InternalServerError().json(e.to_string())
//     }
// }