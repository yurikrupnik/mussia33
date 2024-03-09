use crate::users_mongo::model::UserRedis;
use bb8::Pool;
use bb8_redis::RedisConnectionManager;
use redis::{AsyncCommands, RedisError};
use serde_json::from_str;

pub async fn get_users_redis(
    pool: &Pool<RedisConnectionManager>,
    key: &str,
) -> Result<Option<Vec<UserRedis>>, RedisError> {
    // Acquire a connection from the pool
    let mut conn = pool.get().await.map_err(|e| {
        RedisError::from((
            redis::ErrorKind::IoError,
            "Failed to get connection from pool",
            e.to_string(),
        ))
    })?;

    // Attempt to fetch the serialized string from Redis using the `get` command from the `AsyncCommands` trait
    let serialized_users: Option<String> = conn.get(key).await.map_err(|e| {
        RedisError::from((
            redis::ErrorKind::IoError,
            "Failed to execute get command",
            e.to_string(),
        ))
    })?;

    match serialized_users {
        Some(data) => {
            // Attempt to deserialize the string back into Vec<UserRedis>
            from_str(&data)
                .map(Some) // Wrap the result in Some if successful
                .map_err(|_e| {
                    RedisError::from((redis::ErrorKind::TypeError, "Failed to deserialize data"))
                })
        }
        None => Ok(None), // Key does not exist
    }
}
