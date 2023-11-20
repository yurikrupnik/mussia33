use chrono::NaiveDateTime;
use rust_proc_macros::{DbResource, Reflective};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;
use salvo::oapi::{
  // self, EndpointOutRegister,
  // ToResponses,
  ToSchema, ToResponse
};

#[derive(DbResource, FromRow, Debug, Deserialize, Serialize, Validate, ToSchema, ToResponse)]
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

/// NewUser is used to create a new user
#[derive(FromRow, Debug, Deserialize, Serialize, Validate, Reflective, ToSchema, Clone)]
pub struct NewUser {
    /// Username is used to create a new user
    #[validate(length(min = 3))]
    // #[schema(default = "john")]
    pub username: String,
    /// Email is used to create a new user
    #[validate(email)]
    // #[schema(default = "john@gmail.com")]
    pub email: String,
    // #[schema(default = "12345")]
    /// Password is used to create a new user
    #[validate(length(min = 5))]
    pub password: String,
}

#[derive(FromRow, Debug, Deserialize, Serialize, Validate, ToSchema)]
pub struct UpdateProfile {
    // #[schema(default = "John Doe")]
    pub full_name: Option<String>,
    // #[schema(default = "I work at ...")]
    pub bio: Option<String>,
    #[validate(url)]
    // #[schema(default = "https://static.productionready.io/images/smiley-cyrus.jpg")]
    pub image: Option<String>,
}
