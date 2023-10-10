use mongo::MongoRepository;
// use crate::user::User;
use actix_web::{web, HttpResponse, Responder, Scope};
use serde::{de::DeserializeOwned, Serialize};
use crate::model::Project;
use mongodb::{
    bson::{doc, oid::ObjectId},
    options::FindOptions,
    Client, Collection,
};
use futures::TryStreamExt;


pub fn projects_router() -> Scope {
    web::scope("/projects")
        .service(
            web::resource("")
                .route(web::get().to(projects_list))
                // .route(web::delete().to(drop_users))
                // .route(web::post().to(add_user)),
        )
}

// use validator::Validate;

/// Get list of projects.
///
/// List `Projects` from mongodb.
///
/// One could call the api endpoint with following curl.
/// ```text
/// curl localhost:8080/api/projects
/// ```
#[utoipa::path(
get,
path = "/api/projects",
responses(
(status = 200, description = "Projects found successfully", body = [User]),
),
params(
)
)]
pub async fn projects_list(
    client: web::Data<Client>,
    // db: web::Data<MongoRepository<Project>>,
) -> impl Responder
// where
//     T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static
{
    let collection: Collection<Project> = client.database("test").collection(Project::COLLECTION);
    let find_options = FindOptions::builder()
        // .projection(projection)
        .limit(10)
        .build();

    let mut cursor = collection
        // .clone_with_type()
        .find(None, find_options)
        .await
        .expect("failed fetching");
    let mut payload: Vec<Project> = Vec::new();

    while let Some(product) = cursor
        .try_next()
        .await
        .expect("Error mapping through cursor")
    {
        payload.push(product)
    }
    HttpResponse::Ok().json(payload)
    // let results = db.list().await;
    // match results {
    //     Ok(res) => HttpResponse::Ok().json(res),
    //     Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    // }
}