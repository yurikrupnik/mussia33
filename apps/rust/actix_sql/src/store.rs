use sqlx::PgPool;

// TODO check difference between pub vs pub(crate)
#[derive(Clone)]
pub struct Store {
    pub pool: PgPool,
    pub port: u16,
    // pub host: Box<String>,
}

impl Store {
    pub fn new(pool: PgPool) -> Self {
        Self { pool, port: 8080 }
    }
}
