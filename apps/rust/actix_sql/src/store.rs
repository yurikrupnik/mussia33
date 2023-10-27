use sqlx::PgPool;

// TODO check difference between pub vs pub(crate)
#[derive(Clone)]
pub struct Store {
    pub pool: PgPool,
}

impl Store {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

