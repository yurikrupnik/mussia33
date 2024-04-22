use super::handlers::{
    create_project, delete_project, drop, generic_create_project, get_project, get_projects,
    update_project,
};
use super::model::{NewProject, Project};
use ntex::web;
use rust_proc_macros::DbResource;
use serde::{de::DeserializeOwned, Serialize};
use validator::Validate;

pub fn project_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/project").service((
            web::resource("")
                .route(web::delete().to(drop))
                .route(web::get().to(get_projects))
                // .route(web::post().to(generic_create_project::<Project, NewProject>)),
                .route(web::post().to(create_project)),
            web::resource("/{id}")
                .route(web::get().to(get_project))
                .route(web::put().to(update_project))
                .route(web::delete().to(delete_project)),
        )),
    );
}

pub fn generic_project_routes<T, C>(cfg: &mut web::ServiceConfig)
where
    T: 'static + DbResource + Serialize + DeserializeOwned + Sync + Send + Unpin,
    C: 'static + Serialize + DeserializeOwned + Sync + Send + Unpin + Validate,
    // U: 'static + Serialize + DeserializeOwned + Sync + Send + Unpin + Validate,
{
    // dbg!(T::URL);
    cfg.service(
        // web::scope("/project").service((
        web::scope(T::URL).service((
            web::resource("")
                .route(web::delete().to(drop))
                // .route(web::get().to(get_users))
                .route(web::post().to(generic_create_project::<T, C>)),
            // .route(web::post().to(create_project)),
            web::resource("/{id}")
                .route(web::get().to(get_project))
                .route(web::put().to(update_project))
                .route(web::delete().to(delete_project)),
        )),
    );
}
