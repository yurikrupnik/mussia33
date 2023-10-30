use crate::errors::ErrorResponse;
use crate::MongoRepository;
use actix_web::{
    web::{Data, Json, Path, Query},
    HttpResponse, Responder,
};
use mongodb::bson::{to_document, Document};
use mongodb::options::FindOptions;
use serde::{de::DeserializeOwned, Serialize};
use serde_json::json;
use validator::Validate;

pub async fn list_items<T, U>(
    db: Data<MongoRepository<T>>,
    query: Query<U>,
    options: Option<FindOptions>,
) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
    U: Serialize,
{
    let query_params_json = json!(query.into_inner());
    let filter = to_document(&query_params_json).unwrap_or_else(|_| Document::new());
    let results = db.list(filter, options.unwrap_or_default()).await;
    match results {
        Ok(res) => HttpResponse::Ok().json(res),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn create_item<T>(db: Data<MongoRepository<T>>, body: Json<T>) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    match body.validate() {
        Ok(_) => (),
        Err(e) => {
            return HttpResponse::BadRequest().json(e.errors());
        }
    }
    let result = db.create(body.into_inner()).await;
    match result {
        Ok(res) => HttpResponse::Created().json(res),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn get_item<T>(db: Data<MongoRepository<T>>, path: Path<String>) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let result = db.find_by_id(&id).await;
    match result {
        Ok(Some(payload)) => HttpResponse::Ok().json(payload),
        Ok(None) => HttpResponse::NotFound().json(ErrorResponse::NotFound(format!("id = {}", &id))),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn drop_items<T>(db: Data<MongoRepository<T>>) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    let result = db.drop_db().await;
    match result {
        Ok(_) => HttpResponse::Ok().json("successfully deleted!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn delete_item<T>(db: Data<MongoRepository<T>>, path: Path<String>) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let result = db.delete(&id).await;
    match result {
        Ok(res) => {
            if res.deleted_count == 1 {
                HttpResponse::Ok().finish()
            } else {
                HttpResponse::NotFound()
                    .json(ErrorResponse::NotFound(format!("not found id = {}", &id)))
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn update_item<T>(
    db: Data<MongoRepository<T>>,
    path: Path<String>,
    body: Json<T>,
) -> impl Responder
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static + Validate,
{
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let result = db.update_by_id(&id, body.into_inner()).await;
    match result {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
