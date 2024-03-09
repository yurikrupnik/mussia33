// use redis::{aio::ConnectionLike, AsyncCommands, RedisResult};
use futures::StreamExt;
// streams::StreamExt
use redis::{AsyncCommands, Client, RedisResult};

pub async fn subscribe_to_channel(channel: &str) -> RedisResult<()> {
    let client = Client::open("redis://127.0.0.1/").unwrap();
    let mut conn = client.get_async_connection().await.unwrap();
    let mut pubsub = conn.into_pubsub();
    pubsub.subscribe(channel).await?;

    let mut stream = pubsub.into_on_message();

    while let Some(msg) = stream.next().await {
        let payload: String = msg.get_payload()?;
        println!("Received: {}", payload);
    }

    Ok(())
}

// async fn subscribe_to_channel<C>(mut conn: C, channel_name: &str) -> RedisResult<()>
// where
//     C: ConnectionLike + Send + 'static,
// {
//     // Subscribe to a channel
//     let mut pubsub = conn.as_pubsub();
//     pubsub.subscribe(channel_name).await?;
//
//     // Listen for messages on the channel
//     let mut stream = pubsub.into_on_message();
//
//     while let Some(msg) = stream.next().await {
//         // Assuming the message is a simple string
//         let payload: String = msg.get_payload()?;
//         println!("Received: {}", payload);
//     }
//
//     Ok(())
// }
