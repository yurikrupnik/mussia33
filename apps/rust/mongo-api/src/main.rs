use actix::{Actor, Addr, Context, Handler, Message, SyncArbiter};
use actix_web::{web, App, HttpResponse, HttpServer};
use mongodb::{
  options::{ClientOptions, FindOptions},
  Client, Collection,
};
use redis::AsyncCommands;
use serde::{Deserialize, Serialize};

// Define messages for communication between actors
#[derive(Message, Serialize, Deserialize)]
#[rtype(result = "Result<Vec<User>, String>")]
struct GetAllUsers;

#[derive(Message, Serialize, Deserialize)]
#[rtype(result = "Result<User, String>")]
struct CreateUser(User);

// User struct (similar to the TypeScript User interface)
#[derive(Debug, Serialize, Deserialize, Clone)]
struct User {
  id: Option<String>,
  name: String,
  email: String,
}

// User actor to handle database interactions
struct UserActor {
  user_collection: Collection<User>,
}

impl Actor for UserActor {
  type Context = Context<Self>;
}

impl UserActor {
  fn new(user_collection: Collection<User>) -> Self {
    UserActor { user_collection }
  }
}

impl Handler<GetAllUsers> for UserActor {
  type Result = Result<Vec<User>, String>;

  fn handle(&mut self, _msg: GetAllUsers, _: &mut Context<Self>) -> Self::Result {
    let options = FindOptions::default();
    match self.user_collection.find(None, options).map_err(|e| e.to_string()) {
      Ok(cursor) => cursor.map(|doc| doc.unwrap()).collect(),
      Err(e) => Err(e),
    }
  }
}

impl Handler<CreateUser> for UserActor {
  type Result = Result<User, String>;

  fn handle(&mut self, msg: CreateUser, _: &mut Context<Self>) -> Self::Result {
    let user = msg.0;
    match self.user_collection.insert_one(user.clone(), None).map_err(|e| e.to_string()) {
      Ok(_) => Ok(user),
      Err(e) => Err(e.to_string()),
    }
  }
}

// Actix web handler for API endpoints
async fn get_users(data: web::Data<Addr<UserActor>>) -> HttpResponse {
  match data.send(GetAllUsers).await {
    Ok(users) => match users {
      Ok(users) => HttpResponse::Ok().json(users),
      Err(err) => HttpResponse::InternalServerError().body(err),
    },
    Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
  }
}

async fn create_user(
  data: web::Data<Addr<UserActor>>,
  user: web::Json<User>,
) -> HttpResponse {
  match data.send(CreateUser(user.into_inner())).await {
    Ok(created_user) => match created_user {
      Ok(user) => HttpResponse::Ok().json(user),
      Err(err) => HttpResponse::InternalServerError().body(err),
    },
    Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
  }
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
  // Redis configuration
  let redis_client = redis::Client::open("redis://127.0.0.1/").expect("Failed to connect to Redis");
  let mut redis_conn = redis_client
    .get_async_connection()
    .await
    .expect("Failed to get Redis connection");

  // NestJS-like Redis configuration
  let redis_config = serde_json::json!({
        "host": "localhost",
        "port": 6379,
        "password": "your_redis_password"
    });
  redis_conn.set("config", redis_config.to_string()).await.expect("Failed to set Redis config");

  // MongoDB configuration
  let mongo_client_options = ClientOptions::parse("mongodb://localhost:27017")
    .await
    .expect("Failed to parse MongoDB options");
  let mongo_client = Client::with_options(mongo_client_options).expect("Failed to connect to MongoDB");
  let mongo_db = mongo_client.database("your_db_name");
  let user_collection = mongo_db.collection::<User>("users");

  // Start the User actor
  let addr = SyncArbiter::start(1, move || UserActor::new(user_collection.clone()));

  HttpServer::new(move || {
    App::new()
      .data(addr.clone())
      .route("/users", web::get().to(get_users))
      .route("/users", web::post().to(create_user))
  })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
