// use crate::users_mongo::model::User;
use async_trait::async_trait;
use mongodb::bson::oid::{Error, ObjectId};
use mongodb::bson::{doc, from_document, to_document, Document};
use mongodb::options::{FindOneAndUpdateOptions, ReturnDocument};
use mongodb::{Client, Collection, Database};
use ntex::web::types::State;
use ntex::web::{HttpResponse, Responder};
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use std::fmt::Error as s;
use validator::Validate;

pub fn create_query_id(id: ObjectId) -> Document {
    doc! {"_id": id}
}

pub enum ResponseErrors {}

pub fn create_response<T>(response: Result<Option<Document>, Error>, id: ObjectId) -> impl Responder
where
    T: Serialize + Sync + Send + Unpin + DeserializeOwned + 'static,
{
    match response {
        Ok(Some(payload)) => {
            let doc: T = from_document(payload).unwrap();
            HttpResponse::Created().json(&doc)
        }
        Ok(None) => HttpResponse::NotFound().json::<String>(&format!("No user found with id {id}")),
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}

// use crate::project::model::Project;
// use crate::shared::app_state::AppState;
use crate::shared::validation::validate_request_body;
use rust_proc_macros::DbResource;

pub async fn create_item<T, U>(db: &Database, item: U) -> HttpResponse
where
    T: DbResource + Serialize + DeserializeOwned + Sync + Send + Unpin,
    U: Serialize + DeserializeOwned + Sync + Send + Unpin + Validate + 'static,
{
    if let Err(response) = validate_request_body(&item) {
        return response; // Returns early if validation fails
    }
    let collection = db.collection(T::COLLECTION);
    let document = to_document(&item).unwrap();
    let result = collection
        .insert_one(document, None)
        .await
        .expect("Error creating item");
    let new_id = result.inserted_id.as_object_id().unwrap();
    let response = collection.find_one(create_query_id(new_id), None).await;
    match response {
        Ok(Some(payload)) => {
            let doc: T = from_document(payload).unwrap();
            HttpResponse::Created().json(&doc)
        }
        Ok(None) => {
            HttpResponse::NotFound().json::<String>(&format!("No user found with id {new_id}"))
        }
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}

pub async fn drop_collection<T: DbResource>(db: &Database) -> HttpResponse {
    let collection: Collection<Document> = db.collection(T::COLLECTION);
    collection.drop(None).await.unwrap();
    HttpResponse::Ok().body("successfully deleted!")
}

pub async fn delete_by_id<T>(db: &Database, id: &str) -> HttpResponse
where
    T: DbResource + DeserializeOwned + Serialize + Sync + Send + Unpin,
{
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": &obj_id};
    let collection: Collection<T> = db.collection(T::COLLECTION);
    let result = collection
        .delete_one(filter, None)
        .await
        .expect("failed deleting");
    if result.deleted_count == 1 {
        HttpResponse::Ok().json(&"successfully deleted!")
    } else {
        HttpResponse::NotFound().json(&format!("item with specified ID {obj_id} not found!"))
    }
}
pub async fn get_by_id<T>(db: &Database, id: &str) -> HttpResponse
where
    T: DbResource + DeserializeOwned + Serialize + Sync + Send + Unpin,
{
    let collection: Collection<T> = db.collection(T::COLLECTION);
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let result = collection.find_one(filter, None).await;
    match result {
        Ok(Some(payload)) => HttpResponse::Ok().json(&payload),
        Ok(None) => HttpResponse::NotFound().json(&format!("No item found with id {obj_id}")),
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}

pub async fn update_by_id<T, U>(db: &Database, body: U, id: &str) -> HttpResponse
where
    T: DbResource + DeserializeOwned + Serialize + Sync + Send + Unpin,
    U: DeserializeOwned + Serialize + Sync + Send + Unpin + Validate,
{
    if let Err(response) = validate_request_body(&body) {
        return response; // Returns early if validation fails
    }
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let collection: Collection<Document> = db.collection(T::COLLECTION);
    let serialized_item = to_document(&body).expect("Error serializing item");
    let new_doc = doc! {
        "$set": serialized_item
    };
    let options = FindOneAndUpdateOptions::builder()
        .return_document(ReturnDocument::After)
        .build();
    let result = collection
        .find_one_and_update(filter, new_doc, options)
        .await
        .unwrap();
    match result {
        Some(payload) => {
            let doc: T = from_document(payload).unwrap();
            HttpResponse::Created().json(&doc)
        }
        None => HttpResponse::NotFound().json(&format!("not found item with ID {id}")),
    }
}
