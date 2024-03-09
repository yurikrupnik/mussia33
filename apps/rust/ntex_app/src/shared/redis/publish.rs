use bb8::Pool;
use bb8_redis::RedisConnectionManager;
use redis::AsyncCommands;
use redis::RedisResult;

pub async fn publish_message(
    pool: &Pool<RedisConnectionManager>,
    channel: &str,
    message: &str,
) -> redis::RedisResult<()> {
    let mut conn = pool.get().await.unwrap();
    conn.publish(channel, message).await
}

pub async fn publish_message1<C>(mut conn: C, channel_name: &str, message: &str) -> RedisResult<()>
where
    C: AsyncCommands + Send,
{
    conn.publish(channel_name, message).await
}
