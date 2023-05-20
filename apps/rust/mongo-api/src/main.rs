use actix_web::{web, App, HttpServer, HttpResponse};
use google_cloud_pubsub::client::{Client, ClientConfig};
use google_cloud_gax::grpc::Status;
use futures_util::StreamExt;
// use std::env;
// use google_cloud_default::WithAuthExt;
// use google_cloud_googleapis::pubsub::v1::PubsubMessage;
// use google_cloud_pubsub::subscription::SubscriptionConfig;
// use std::time::Duration;
// use tokio_util::sync::CancellationToken;
// use tokio::

async fn run(config: ClientConfig) -> Result<(), Status> {
  // Creating Client, Topic and Subscription...
  let client = Client::new(config).await.unwrap();
  let subscription = client.subscription("my-topic2");

  // Read the messages as a stream
  // (needs futures_util::StreamExt as import)
  // Note: This blocks the current thread but helps working with non clonable data
  let mut stream = subscription.subscribe(None).await?;
  while let Some(message) = stream.next().await {
    // Handle data.
    println!("Got Message: {:?}", message.message);

    // Ack or Nack message.
    let _ = message.ack().await;
  }
  Ok(())
}

// pub async fn drop_users() -> HttpResponse {
//   HttpResponse::Ok().json("aris is god!".to_string())
// }

pub async fn drop_users() -> HttpResponse {
  // let config = ClientConfig::default().with_auth().await.unwrap();
  // let client = Client::new(config).await.unwrap();
  let config = ClientConfig::default();
  // let config = ClientConfig::default().build().unwrap();
  tokio::spawn(run(config));

  HttpResponse::Ok().json("Subscription started.".to_string())
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
  HttpServer::new(move || {
    App::new()
      // .app_data(pubsub.clone())
      .route("/", web::get().to(drop_users))
  })
    .bind("0.0.0.0:8081")?
    .run()
    .await
}
