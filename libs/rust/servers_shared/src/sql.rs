use super::envs::get_sql_uri;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

pub async fn create_pool(
    url: Option<&str>,
    connections: Option<u32>,
) -> Result<Pool<Postgres>, sqlx::Error> {
    let pool = PgPoolOptions::new()
        .max_connections(connections.unwrap_or(5))
        .connect(url.unwrap_or(&get_sql_uri()))
        .await?;

    Ok(pool)
}
