use actix_web::{web::{ServiceConfig, Data}, Scope};
use futures::executor::block_on;
use serde::{de::DeserializeOwned, Serialize};
use crate::mongo_service::MongoRepository;

async fn create_repository<T>(config: &mut ServiceConfig, db: &str, collection: &str)
    where
        T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    let repository = MongoRepository::<T>::new(db, collection).await;
    let data: Data<MongoRepository<T>> = Data::new(repository);
    config.app_data(data);
}

pub fn create_configure<T>(
    db: &'static str,
    collection: &'static str,
    router: Scope,
) -> impl FnOnce(&mut ServiceConfig) + 'static
    where
        T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    move |cfg: &mut ServiceConfig| {
        block_on(create_repository::<T>(cfg, db, collection));
        cfg.service(router);
    }
}

// todo tests

// #[cfg(test)]
// mod tests {
//     use super::*;
//     use actix_service::Service;
//     use actix_web::{test, web, App, HttpResponse};
//     use mongodb::bson::oid::{ObjectId, Error};
//     use mongodb::bson::doc;
//     use serde::{Deserialize, Serialize};
//     // use std::sync::Arc;
//
//     // Define a struct for your test entity
//     #[derive(Debug, Serialize, Deserialize, PartialEq)]
//     struct TestEntity {
//         #[serde(rename = "_id")]
//         id: Option<ObjectId>,
//         // Other fields
//     }
//
//     // Implement MongoRepository for the test entity
//     impl MongoRepository<TestEntity> {
//         async fn create_test_entity(&self, entity: TestEntity) -> Result<Option<TestEntity>, Error> {
//             self.create(entity).await
//         }
//     }
//
//     // Define your application configuration and routes for testing
//     fn create_app<T>() -> App<T> {
//         App::new()
//             .configure(create_routes::<TestEntity>("test_db", "test_collection", web::scope("/api")))
//             .route("/ping", web::get().to(|| HttpResponse::Ok()))
//     }
//
//     #[actix_rt::test]
//     async fn test_create_repository_and_route() {
//         // Create a test database and collection
//         let db_name = "test_db";
//         let collection_name = "test_collection";
//
//         // Create a test repository
//         let repository = MongoRepository::<TestEntity>::init(db_name, collection_name)
//             .await
//             .expect("Failed to create repository");
//
//         // Create an Actix application with the test routes
//         let mut app = test::init_service(create_app()).await;
//
//         // Create a test entity to insert
//         let test_entity = TestEntity {
//             id: None,
//             // Initialize other fields here
//         };
//
//         // Insert the test entity
//         let inserted_entity = repository
//             .create_test_entity(test_entity.clone())
//             .await
//             .expect("Failed to insert entity");
//
//         // Send an HTTP GET request to the route you want to test
//         let req = test::TestRequest::get().uri("/api/ping").to_request();
//         let response = test::call_service(&mut app, req).await;
//
//         // Ensure that the response is successful
//         assert!(response.is_ok());
//
//         // Retrieve the inserted entity from the repository
//         let retrieved_entity = repository
//             .find_by_id(&inserted_entity.unwrap()._id.to_hex())
//             .await
//             .expect("Failed to retrieve entity")
//             .expect("Entity not found");
//
//         // Verify that the retrieved entity matches the inserted entity
//         assert_eq!(retrieved_entity, Some(test_entity));
//     }
// }