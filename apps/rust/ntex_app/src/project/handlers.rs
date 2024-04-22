use super::model::{NewProject, Project, ProjectQueryParams, UpdateProject};
use crate::shared::app_state::AppState;
use crate::shared::mongo::filter_and_options::construct_find_options_and_filter;
use crate::shared::mongo::service::{
    create_item, delete_by_id, drop_collection, get_by_id, update_by_id,
};
use crate::shared::validation::validate_request_body;
use crate::users_mongo::model::User;
use futures::TryStreamExt;
use mongodb::bson::oid::ObjectId;
use mongodb::bson::{doc, from_document, to_document, Document};
use mongodb::options::{FindOneAndUpdateOptions, ReturnDocument};
use mongodb::Collection;
use ntex::web::types::{Json, Path, Query, State};
use ntex::web::{HttpResponse, Responder};
use rust_proc_macros::DbResource;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::Validate;

/// Create `Project` by `NewProject`
pub async fn create_project(body: Json<NewProject>, app_state: State<AppState>) -> impl Responder {
    let body = body.into_inner();
    let db = &app_state.db;
    create_item::<Project, NewProject>(db, body).await
}

pub async fn generic_create_project<T, U>(
    body: Json<U>,
    app_state: State<AppState>,
) -> impl Responder
where
    T: DbResource + Serialize + DeserializeOwned + Sync + Send + Unpin,
    U: Serialize + DeserializeOwned + Sync + Send + Unpin + Validate + 'static,
{
    let body = body.into_inner();
    let db = &app_state.db;
    create_item::<T, U>(db, body).await
}

/// Drop projects collection
pub async fn drop(app_state: State<AppState>) -> impl Responder {
    let db = &app_state.db;
    drop_collection::<Project>(db).await
}

/// Get `Project` by ID
pub async fn get_project(app_state: State<AppState>, id: Path<String>) -> impl Responder {
    let item_id = id.into_inner();
    let db = &app_state.db;
    get_by_id::<Project>(db, &item_id).await
}

/// Get all `Project`
pub async fn get_projects(
    query: Query<ProjectQueryParams>,
    app_state: State<AppState>,
) -> impl Responder {
    let query = query.into_inner();
    let (filter, options) = construct_find_options_and_filter(query.clone()).unwrap();
    let db = &app_state.db;
    let collection: Collection<Project> = db.collection(Project::COLLECTION);
    let users_collection: Collection<User> = db.collection(User::COLLECTION);

    #[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize)]
    struct ProjectResponse {
        id: String,
        users: Vec<User>,
        name: String,
    }

    let mut cursor = collection
        .find(filter, options)
        .await
        .expect("failed fetching");
    let mut payload: Vec<ProjectResponse> = Vec::new();
    while let Some(item) = cursor
        .try_next()
        .await
        .expect("Error mapping through cursor")
    {
        let user_ids = item.users;

        let mut users_cursor = users_collection
            .find(doc! { "_id": { "$in": user_ids } }, None)
            .await
            .expect("Failed fetching users");

        let mut users: Vec<User> = Vec::new();
        while let Some(user) = users_cursor
            .try_next()
            .await
            .expect("Error mapping through users cursor")
        {
            users.push(user);
        }

        payload.push(ProjectResponse {
            id: item.id.to_hex(),
            users,
            name: item.name,
        });
    }
    HttpResponse::Ok().json(&payload)
}

/// Update `Project` by `UpdateProject` struct
pub async fn update_project(
    body: Json<UpdateProject>,
    id: Path<String>,
    app_state: State<AppState>,
) -> impl Responder {
    let body = body.into_inner();
    let item_id = id.into_inner();
    let db = &app_state.db;
    if let Err(response) = validate_request_body(&body) {
        return response; // Returns early if validation fails
    }
    let obj_id = ObjectId::parse_str(&item_id).unwrap();
    let filter = doc! {"_id": obj_id};
    let collection: Collection<Document> = db.collection(Project::COLLECTION);
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
        .expect("Error updating item");
    match result {
        Some(payload) => {
            let doc: Project = from_document(payload).expect("Error deserializing item");
            HttpResponse::Created().json(&doc)
        }
        None => HttpResponse::NotFound().json(&format!("not found item with ID {item_id}")),
    }
    // update_by_id::<Project, UpdateProject>(db, body, &item_id).await
}

/// Delete `Project` by ID
pub async fn delete_project(app_state: State<AppState>, id: Path<String>) -> impl Responder {
    let item_id = id.into_inner();
    let db = &app_state.db;
    delete_by_id::<Project>(db, &item_id).await
}
