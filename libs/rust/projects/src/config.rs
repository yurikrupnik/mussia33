use actix_web::web;
use serde::{de::DeserializeOwned, Serialize};
use crate::model::Project;
use mongo::MongoRepository;

async fn inits<T>(cfg: &mut web::ServiceConfig, db: &str, collection: &str)
    where
        T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    let repository = MongoRepository::<T>::init(db, collection).await;
    let data: web::Data<MongoRepository<T>> = web::Data::new(repository);
    cfg.app_data(data);
}

pub fn projects_config(config: &mut web::ServiceConfig) {
    let _s = Project::get_collection(2);
    let _ss = Project::COLLECTION;
    // block_on(inits::<T>(config, db, collection));
    config.service(
        web::scope("/projects")
            // .service(web::resource("").route(web::get().to(projects_list::<Project>)))
        // .service(web::resource("/post1").route(web::post().to(handle_post_1)))
        // .service(web::resource("/post2").route(web::post().to(handle_post_2)))
        // .service(web::resource("/post3").route(web::post().to(handle_post_3))),
    );
}