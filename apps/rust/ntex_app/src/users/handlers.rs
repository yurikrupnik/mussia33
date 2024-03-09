use super::model::{NewUser, UpdateProfile, User};
use crate::shared::validation::validate_request_body;
use crate::AppState;
use ntex::web::{
    types::{Json, Path, State},
    HttpResponse, Responder,
};
use rust_proc_macros::DbResource;
use sqlx::{query, query_as};

pub async fn delete_user(app_state: State<AppState>, id: Path<String>) -> impl Responder {
    let item_id = id.into_inner();
    let result = query(&format!(
        "DELETE FROM {} WHERE id = '{}'",
        User::COLLECTION,
        &item_id
    ))
    .execute(&app_state.pool)
    .await;
    match result {
        Ok(result) => {
            if result.rows_affected() > 0 {
                HttpResponse::Ok().json(&format!("Deleted item with ID: {}", item_id))
            } else {
                HttpResponse::NotFound().json(&format!("Item with ID: {} not found", item_id))
            }
        }
        Err(e) => HttpResponse::InternalServerError().json(&e.to_string()),
    }
}

pub async fn drop(app_state: State<AppState>) -> impl Responder {
    let result = sqlx::query(&format!("DELETE FROM {}", User::COLLECTION))
        .execute(&app_state.pool)
        .await;

    match result {
        Ok(data) => HttpResponse::Ok().json(&data.rows_affected()),
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}

/// Update user with `NewUser` DTO
pub async fn create_user(body: Json<NewUser>, app_state: State<AppState>) -> impl Responder {
    // Use the custom validation function with the de referenced body
    if let Err(response) = validate_request_body(&body.0) {
        return response; // Returns early if validation fails
    }
    let query = &format!(
        "INSERT INTO {} (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        User::COLLECTION,
    );
    let result = query_as::<_, User>(query)
        .bind(&body.username)
        .bind(&body.email)
        .bind(&body.password)
        .fetch_one(&app_state.pool)
        .await;

    match result {
        Ok(data) => HttpResponse::Created().json(&data),
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}

/// Update user with `UpdateProfile` DTO
pub async fn update_user(
    body: Json<UpdateProfile>,
    id: Path<String>,
    app_state: State<AppState>,
) -> impl Responder {
    // Use the custom validation function with the de referenced body
    if let Err(response) = validate_request_body(&body.0) {
        return response; // Returns early if validation fails
    }
    let item_id = id.into_inner();
    let query = &format!(
        "UPDATE {} SET full_name = $1, bio = $2, image = $3 WHERE id = '{}' RETURNING *",
        User::COLLECTION,
        item_id
    );
    let result = sqlx::query_as::<_, User>(query)
        .bind(&body.full_name)
        .bind(&body.bio)
        .bind(&body.image)
        .fetch_one(&app_state.pool)
        .await;

    match result {
        Ok(data) => HttpResponse::Ok().json(&data),
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}

pub async fn get_user(app_state: State<AppState>, id: Path<String>) -> impl Responder {
    let item_id = id.into_inner();
    let query = &format!(
        "SELECT * FROM {} where id = '{}'",
        User::COLLECTION,
        item_id
    );
    let result = query_as::<_, User>(query).fetch_one(&app_state.pool).await;
    match result {
        Ok(data) => HttpResponse::Ok().json(&data),
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}

pub async fn get_users(app_state: State<AppState>) -> impl Responder {
    let result = query_as::<_, User>(&format!("SELECT * FROM {}", User::COLLECTION))
        .fetch_all(&app_state.pool)
        .await;
    match result {
        Ok(data) => HttpResponse::Ok().json(&data),
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}
