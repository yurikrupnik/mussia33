use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
// use futures::{StreamExt, TryStreamExt};
// use k8s_openapi::api::core::v1::Pod;
// use kube::{
//     api::{Api, ListParams, ResourceExt},
//     Client,
// };

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!!!")
}

// #[get("/kube")]
// async fn kubernetes() -> impl Responder {
//     let client = Client::try_default().await.unwrap();
//     let pods: Api<Pod> = Api::default_namespaced(client);
//     // let namespace = String::from("kube-system");
//     // let pods: Api<Pod> = Api::namespaced(client, &namespace);
//     let mut data: Vec<String> = Vec::new();
//     for p in pods.list(&ListParams::default()).await.unwrap() {
//         println!("found pod {}", p.name_any());
//         data.push(p.name_any());
//     }
//     HttpResponse::Ok().json(data)
// }

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(hello).service(echo)
        // .service(kubernetes)
        // .route("/hey", web::get().to(manual_hello))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
