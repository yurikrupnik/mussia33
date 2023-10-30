// use actix_web::{
//     delete, get, post, put,
//     web::{Data, Json, Path, Query, ServiceConfig, resource},
//     HttpResponse, Responder,
// };
// use crate::store::{Store, Todo};
// // mod crate::
// // pub(super) use crate::store::{Store, Todo};
//
// async fn get_todos(app_state: Data<Store>) -> impl Responder {
//     // let query = sqlx::query_file!("queries/get_users.sql");
//     let result = sqlx::query_as::<_, Todo>("SELECT * FROM todos")
//         .fetch_all(&app_state.pool)
//         .await
//         .unwrap();
//     HttpResponse::Ok().json(result)
// }
//
// async fn delete_todo(id: Path<i16>, app_state: Data<Store>) -> impl Responder {
//     // let query = sqlx::query_file!("queries/get_users.sql");
//     // let od = id;
//     let s = id.into_inner();
//     // error!("id: {:#?}", s);
//     let result = sqlx::query_as::<_, Todo>("DELETE FROM todos WHERE id = $1")
//         .bind(s)
//         .fetch_all(&app_state.pool)
//         .await
//         .unwrap();
//     HttpResponse::Ok().json(result)
// }
//
// pub fn configure(store: Data<Store>) -> impl FnOnce(&mut ServiceConfig) {
//     |config: &mut ServiceConfig| {
//         config
//             // .app_data(store)
//             .service(
//                 resource("/todo")
//                     .route(get().to(get_todos))
//
//                 // .route(web::post().to(echo))
//             )
//             // .service(search_todos)
//             // .service(get_todos)
//             // .service(create_todo)
//             // .service(delete_todo);
//             // .service(get_todo_by_id)
//             // .service(update_todo);
//     }
// }
