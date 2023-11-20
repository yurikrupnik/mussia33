use super::model::{NewUser, UpdateProfile, User};
use rust_proc_macros::DbResource;
use sqlx::{query, query_as};
use validator::Validate;
use salvo::http::StatusCode;
use salvo::oapi::extract::*;
use salvo::prelude::*;
use super::super::db_pool;

#[endpoint(status_codes(200, 409), tags("Users"))]
pub async fn delete_user(id: PathParam<String>, res: &mut Response) {
  let pool = db_pool();
  let q = &format!("DELETE FROM {} WHERE id = '{}'", User::COLLECTION, id);
  let result = query(q).execute(pool).await;
  match result {
    Ok(result) => {
      if result.rows_affected() > 0 {
        res.status_code(StatusCode::OK).render(Json(format!("Deleted item with ID: {}", id)))
      } else {
        res.status_code(StatusCode::OK).render(Json(format!("Item with ID: {} not found", id)))
      }
    }
    Err(e) => res.status_code(StatusCode::INTERNAL_SERVER_ERROR).render(Json(e.to_string())),
  }
}

#[endpoint(status_codes(200, 409), tags("Users"))]
pub async fn get_user(_id: PathParam<String>, res: &mut Response) {
  let pool = db_pool();
  let query = &format!(
    "SELECT * FROM {} where id = '{}'",
    User::COLLECTION,
    _id
  );
  let result = query_as::<_, User>(query).fetch_one(pool).await;
  //
  // // handle_result(result)
  match result {
    Ok(payload) => res.status_code(StatusCode::OK).render(Json(payload)),
    Err(e) => res.status_code(StatusCode::INTERNAL_SERVER_ERROR).render(Json(e.to_string())),
  }
  // res.status_code(StatusCode::OK).render(Json(format!("Deleted item with ID")))
}

#[endpoint(status_codes(200, 409), tags("Users"))]
pub async fn drop_users(res: &mut Response) {
  let pool = db_pool();
  let result = sqlx::query(&format!("DELETE FROM {}", User::COLLECTION))
    .execute(pool)
    .await;

  match result {
    Ok(payload) => res.status_code(StatusCode::OK).render(Json(payload.rows_affected())),
    Err(e) => res.status_code(StatusCode::INTERNAL_SERVER_ERROR).render(Json(e.to_string())),
  }
}

#[endpoint(status_codes(200, 409), tags("Users"))]
pub async fn update_user(body: JsonBody<UpdateProfile>, id: PathParam<String>, res: &mut Response) {
  match body.validate() {
    Ok(_) => (),
    Err(e) => {
      return res.status_code(StatusCode::BAD_REQUEST).render(Json(e.errors()));
    }
  }
  let pool = db_pool();
  let query = &format!(
    "UPDATE {} SET full_name = $1, bio = $2, image = $3 WHERE id = '{}' RETURNING *",
    User::COLLECTION,
    id
  );
  let result = sqlx::query_as::<_, User>(query)
    .bind(&body.full_name)
    .bind(&body.bio)
    .bind(&body.image)
    .fetch_one(pool)
    .await;

  match result {
    Ok(payload) => res.status_code(StatusCode::OK).render(Json(payload)),
    Err(e) => res.status_code(StatusCode::INTERNAL_SERVER_ERROR).render(Json(e.to_string())),
  }
}

#[endpoint(status_codes(200, 409), tags("Users"))]
pub async fn get_users(name: QueryParam<String, false>, res: &mut Response) {
  let pool = db_pool();
  let result = query_as::<_, User>(&format!("SELECT * FROM {}", User::COLLECTION))
    .fetch_all(pool)
    .await;
  match result {
    Ok(payload) => res.status_code(StatusCode::OK).render(Json(payload)),
    Err(e) => res.status_code(StatusCode::INTERNAL_SERVER_ERROR).render(Json(e.to_string())),
  }
}

#[endpoint(status_codes(201, 409), tags("Users"))]
pub async fn create_user(body: JsonBody<NewUser>, res: &mut Response) {
  match body.validate() {
    Ok(_) => (),
    Err(e) => {
      return res.status_code(StatusCode::BAD_REQUEST).render(Json(e.errors()));
    }
  }
  let pool = db_pool();
  let query = &format!(
    "INSERT INTO {} (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    User::COLLECTION,
  );
  let result = query_as::<_, User>(query)
    .bind(&body.username)
    .bind(&body.email)
    .bind(&body.password)
    .fetch_one(pool)
    .await;

  match result {
    Ok(item) => res.status_code(StatusCode::CREATED).render(Json(item)),
    Err(e) => res.status_code(StatusCode::INTERNAL_SERVER_ERROR).render(Json(e.to_string())),
  }
}


