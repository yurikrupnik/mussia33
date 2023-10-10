use futures::executor::block_on;
use serde::{de::DeserializeOwned, Serialize};
use actix_web::{web};
use crate::repository::MongoRepository;
use crate::handlers::list;
pub fn create_config_by_type<T>(
    db: &'static str,
    collection: &'static str,
) -> impl FnOnce(&mut web::ServiceConfig) + 'static
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    move |cfg: &mut web::ServiceConfig| {
        block_on(inits::<T>(cfg, db, collection));
        // let url = format!("/{}", collection);
        let url = format!("/{collection}");
        cfg.service(
            web::scope(url.as_str())
                .service(
                    web::resource("")
                        .route(web::get().to(list::<T>))
                        // .route(web::delete().to(drop_users))
                        // .route(web::post().to(add_user)),
                )
                .service(
                    web::resource("/{id}")
                        // .route(web::delete().to(delete_user))
                        // .route(web::put().to(update_user))
                        // .route(web::get().to(get_user)),
                ),
        );
    }
}


async fn inits<T>(cfg: &mut web::ServiceConfig, db: &str, collection: &str)
    where
        T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    let repository = MongoRepository::<T>::init(db, collection).await;
    let data: web::Data<MongoRepository<T>> = web::Data::new(repository);
    cfg.app_data(data);
}