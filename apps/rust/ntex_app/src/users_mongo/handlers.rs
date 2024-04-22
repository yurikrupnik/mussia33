use super::model::{NewUser, QueryParams, UpdateProfile, User};
use crate::shared::mongo::filter_and_options::construct_find_options_and_filter;
use crate::shared::mongo::service::{
    create_item, create_query_id, create_response, drop_collection, ResponseErrors,
};
use crate::shared::redis::users::get_users_redis;
use crate::shared::validation::validate_request_body;
use crate::AppState;
use bb8_redis::redis::AsyncCommands;
use futures::TryStreamExt;
use mongodb::bson::{doc, from_document, oid::ObjectId, to_document, Document};
use mongodb::options::{FindOneAndUpdateOptions, ReturnDocument};
use mongodb::Collection;
use ntex::web::types::Query;
use ntex::web::{
    types::{Json, Path, State},
    HttpResponse, Responder,
};
use redis::RedisResult;
use rust_proc_macros::DbResource;

/// Delete `User` by ID
pub async fn delete_user(app_state: State<AppState>, id: Path<String>) -> impl Responder {
    let item_id = id.into_inner();
    let obj_id = ObjectId::parse_str(item_id).unwrap();
    let filter = doc! {"_id": &obj_id};
    let db = &app_state.db;
    let collection: Collection<User> = db.collection(User::COLLECTION);
    let result = collection
        .delete_one(filter, None)
        .await
        .expect("failed deleting");
    if result.deleted_count == 1 {
        HttpResponse::Ok().json(&"successfully deleted!")
    } else {
        HttpResponse::NotFound().json(&format!("item with specified ID {obj_id} not found!"))
    }
}

/// Drop users collection
pub async fn drop(app_state: State<AppState>) -> impl Responder {
    let db = &app_state.db;
    drop_collection::<User>(db).await
}

/// Create `User` by `NewUser`
pub async fn create_user(body: Json<NewUser>, app_state: State<AppState>) -> impl Responder {
    let body = body.into_inner();
    // Use the custom validation function with the de referenced body
    // if let Err(response) = validate_request_body(&body) {
    //     return response; // Returns early if validation fails
    // }
    let db = &app_state.db;
    create_item::<User, NewUser>(db, body).await
    // let collection = db.collection(User::COLLECTION);
    //
    // let document = to_document(&body).unwrap();
    // let result = collection
    //     .insert_one(document, None)
    //     .await
    //     .expect("Error creating item");
    // let new_id = result.inserted_id.as_object_id().unwrap();
    // let response = collection.find_one(create_query_id(new_id), None).await;
    // match response {
    //     Ok(Some(payload)) => {
    //         let doc: User = from_document(payload).unwrap();
    //         HttpResponse::Created().json(&doc)
    //     }
    //     Ok(None) => {
    //         HttpResponse::NotFound().json::<String>(&format!("No user found with id {new_id}"))
    //     }
    //     Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    // }
}

/// Update `User` by `UpdateProfile` struct
pub async fn update_user(
    body: Json<UpdateProfile>,
    id: Path<String>,
    app_state: State<AppState>,
) -> impl Responder {
    let body = body.into_inner();
    // Use the custom validation function with the de referenced body
    if let Err(response) = validate_request_body(&body) {
        return response; // Returns early if validation fails
    }
    let item_id = id.into_inner();
    let obj_id = ObjectId::parse_str(&item_id).unwrap();
    let filter = doc! {"_id": obj_id};
    // let filter = create_query_id(obj_id);
    let db = &app_state.db;
    let collection: Collection<Document> = db.collection(User::COLLECTION);
    let serialized_item = to_document(&body).expect("Error serializing item");
    let new_doc = doc! {
        "$set": serialized_item
    };
    let options = FindOneAndUpdateOptions::builder()
        .return_document(ReturnDocument::After)
        .build();
    let result = collection
        .find_one_and_update(filter, new_doc, options)
        .await
        .unwrap();
    match result {
        Some(payload) => {
            let doc: User = from_document(payload).unwrap();
            HttpResponse::Created().json(&doc)
        }
        None => HttpResponse::NotFound().json(&format!("not found item with ID {item_id}")),
    }
}

/// Get `User` by ID
pub async fn get_user(app_state: State<AppState>, id: Path<String>) -> impl Responder {
    let item_id = id.into_inner();
    let db = &app_state.db;
    let collection: Collection<User> = db.collection(User::COLLECTION);
    let obj_id = ObjectId::parse_str(item_id).unwrap();
    let filter = doc! {"_id": obj_id};
    let result = collection.find_one(filter, None).await;
    match result {
        Ok(Some(payload)) => HttpResponse::Ok().json(&payload),
        Ok(None) => HttpResponse::NotFound().json(&format!("No product found with id {obj_id}")),
        Err(err) => HttpResponse::InternalServerError().json(&err.to_string()),
    }
}

/// Get `User` list
pub async fn get_users(app_state: State<AppState>, query: Query<QueryParams>) -> impl Responder {
    // init redis connection
    let redis = &app_state.redis;
    let mut connection = redis.get().await.unwrap();

    let query = query.into_inner();
    let (filter, options) = construct_find_options_and_filter(query.clone()).unwrap();
    let db = &app_state.db;
    let s = get_users_redis(redis, "shit").await;
    match s {
        Ok(d) => match d {
            None => {
                println!("none found");
            }
            Some(result) => {
                println!("was found");
                return HttpResponse::Ok().json(&result);
            }
        },
        Err(e) => return HttpResponse::Ok().json(&e.to_string()),
    }

    let collection: Collection<User> = db.collection(User::COLLECTION);
    let mut cursor = collection
        .find(filter, options)
        .await
        .expect("failed fetching");
    let mut payload: Vec<User> = Vec::new();

    while let Some(item) = cursor
        .try_next()
        .await
        .expect("Error mapping through cursor")
    {
        // let oid = if let Some(Bson::ObjectId(oid)) = item.get("_id") {
        //     Some(oid)
        // } else {
        //     None
        // };
        // let mut new_item = item.clone(); // Clone the item to modify it without borrowing issues
        //
        // // Remove the "_id" field from the cloned document and insert the new "id" field
        // if let Some(oid) = oid {
        //     new_item.remove("_id"); // It's safe to remove "_id" from the cloned item
        //     new_item.insert("id", oid.to_hex());
        // }
        payload.push(item)
    }

    let s = payload.clone();
    // Transform Vec<User> to Vec<UserRedis>
    let users_redis: Vec<User> = s
        .into_iter()
        .map(|user| User {
            email: user.email,
            bio: user.bio,
            username: user.username,
            id: user.id,
            full_name: user.full_name,
            image: user.image,
            password_hash: user.password_hash,
            updated_at: user.updated_at, // password_hash
        })
        .collect();

    let d: RedisResult<()> = connection
        .set_ex("shit", serde_json::to_string(&users_redis).unwrap(), 10)
        .await;
    match d {
        Ok(_) => {
            println!("saved to redis")
        }
        Err(_) => println!("error saving to redis"),
    }

    HttpResponse::Ok().json(&payload)
}
