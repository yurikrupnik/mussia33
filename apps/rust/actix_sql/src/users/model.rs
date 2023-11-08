use chrono::NaiveDateTime;
use rust_proc_macros::{DbResource, Reflective};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use utoipa::ToSchema;
use uuid::Uuid;
use validator::Validate;

#[derive(ToSchema, DbResource, FromRow, Debug, Deserialize, Serialize, Validate)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    #[serde(skip_serializing)]
    pub password_hash: String,
    pub full_name: Option<String>,
    pub bio: Option<String>,
    pub image: Option<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(ToSchema, FromRow, Debug, Deserialize, Serialize, Validate, Reflective)]
pub struct NewUser {
    #[validate(length(min = 3))]
    #[schema(default = "john")]
    pub username: String,
    #[validate(email)]
    #[schema(default = "john@gmail.com")]
    pub email: String,
    #[schema(default = "12345")]
    #[validate(length(min = 5))]
    pub password: String,
}

#[derive(ToSchema, FromRow, Debug, Deserialize, Serialize, Validate)]
pub struct UpdateProfile {
    #[schema(default = "John Doe")]
    pub full_name: Option<String>,
    #[schema(default = "I work at ...")]
    pub bio: Option<String>,
    #[validate(url)]
    #[schema(default = "https://static.productionready.io/images/smiley-cyrus.jpg")]
    pub image: Option<String>,
}
