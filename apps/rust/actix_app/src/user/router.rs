use crate::mongo::MongoRepo;
use actix_web::{
    web::{Data, ServiceConfig},
    Scope,
};
use futures::executor::block_on;
use serde::{de::DeserializeOwned, Serialize};

async fn inits<T>(cfg: &mut ServiceConfig, db: &str, collection: &str)
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    let repository = MongoRepo::<T>::init(db, collection).await;
    let data: Data<MongoRepo<T>> = Data::new(repository);
    cfg.app_data(data);
}

pub fn create_config_by_type<T>(
    db: &'static str,
    collection: &'static str,
    router: Scope,
) -> impl FnOnce(&mut ServiceConfig) + 'static
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    move |cfg: &mut ServiceConfig| {
        block_on(inits::<T>(cfg, db, collection));
        // let url = format!("/{collection}");
        cfg.service(router);
        // cfg.service(users_service::<T>(url));
    }
}
