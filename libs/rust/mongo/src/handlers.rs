use crate::repository::MongoRepository;
// use crate::user::User;
use actix_web::{web, HttpResponse, Responder};
use serde::{de::DeserializeOwned, Serialize};
// use validator::Validate;
// use crate::repository::MongoRepository;
pub async fn list<T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static>(
    db: web::Data<MongoRepository<T>>,
) -> impl Responder {
    let results = db.list().await;
    match results {
        Ok(res) => HttpResponse::Ok().json(res),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

// pub async fn create(db: web::Data<MongoRepository<User>>, body: web::Json<User>) -> impl Responder {
//     match body.validate() {
//         Ok(_) => (),
//         Err(e) => {
//             return HttpResponse::BadRequest().json(e.errors());
//         }
//     }
//     let result = db.create(body.clone()).await;
//     match result {
//         Ok(res) => HttpResponse::Created().json(res),
//         Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//     }
// }
//
// pub async fn get(db: web::Data<MongoRepository<User>>, path: web::Path<String>) -> impl Responder {
//     let id = path.into_inner();
//     if id.is_empty() || id.len() != 24 {
//         return HttpResponse::BadRequest().body("invalid ID");
//     };
//     let result = db.find_by_id(&id).await;
//     match result {
//         Ok(Some(payload)) => HttpResponse::Ok().json(payload),
//         Ok(None) => HttpResponse::NotFound().json(ErrorResponse::NotFound(format!("id = {}", &id))),
//         Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//     }
// }
//
// pub async fn delete(db: web::Data<MongoRepository<User>>, path: web::Path<String>) -> HttpResponse {
//     let id = path.into_inner();
//     if id.is_empty() || id.len() != 24 {
//         return HttpResponse::BadRequest().body("invalid ID");
//     };
//     let result = db.delete(&id).await;
//     match result {
//         Ok(res) => {
//             if res.deleted_count == 1 {
//                 HttpResponse::Ok().finish()
//             } else {
//                 HttpResponse::NotFound()
//                     .json(ErrorResponse::NotFound(format!("not found id = {}", &id)))
//             }
//         }
//         Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//     }
// }
//
//
// pub async fn drop(db: web::Data<MongoRepository<User>>) -> HttpResponse {
//     let result = db.drop_db().await;
//     match result {
//         Ok(_) => HttpResponse::Ok().json("successfully deleted!"),
//         Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//     }
// }