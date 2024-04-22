use bb8::Pool;
use bb8_redis::RedisConnectionManager;
use mongodb::Database;
use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub db: Database,
    pub redis: Pool<RedisConnectionManager>,
}

impl AppState {
    pub fn new(pool: PgPool, db: Database, redis: Pool<RedisConnectionManager>) -> Self {
        Self { pool, db, redis }
    }
}
