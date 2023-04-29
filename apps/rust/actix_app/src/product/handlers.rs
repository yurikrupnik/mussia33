use crate::product::model::Product;
// use crate::user::User;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use futures::TryStreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId},
    options::FindOptions,
    Client, Collection,
};

pub const DB_NAME: &str = "rustApp";

/// Create new Product to shared in mongodb.
///
/// Post a new `Product` in request body as json to store it. Api will return
/// created `Product` on success or `ErrorResponse::Conflict` if product with same id already exists.
///
/// One could call the api with.
/// ```text
/// curl localhost:8080/products -d '{"name": "Product 2"}'
/// ```
#[utoipa::path(
request_body = Product,
responses(
(status = 201, description = "Product created successfully", body = Product),
)
)]
#[post("/products")]
pub async fn add_product(client: web::Data<Client>, body: web::Json<Product>) -> impl Responder {
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    let result = collection
        .insert_one(body.clone(), None)
        .await
        .expect("Error creating item");
    let new_id = result.inserted_id.as_object_id().unwrap();
    let res = collection.find_one(doc! {"_id": new_id}, None).await;
    match res {
        Ok(Some(payload)) => HttpResponse::Created().json(payload),
        Ok(None) => HttpResponse::NotFound().body(format!("No user found with id {new_id}")),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/products/{id}")]
pub async fn get_product(client: web::Data<Client>, path: web::Path<String>) -> impl Responder {
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let result = collection.find_one(filter, None).await;
    match result {
        Ok(Some(payload)) => HttpResponse::Ok().json(payload),
        Ok(None) => HttpResponse::NotFound().body(format!("No product found with id {obj_id}")),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

/// Get list of products.
///
/// List todos from mongodb.
///
/// One could call the api endpoint with following curl.
/// ```text
/// curl localhost:8080/products
/// ```
#[utoipa::path(
responses(
(status = 200, description = "List current product items", body = [Product])
)
)]
#[get("/products")]
pub async fn get_products(client: web::Data<Client>) -> impl Responder {
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    // let filter = doc! {"name": "product 1".to_string()};
    // let find_options = FindOptions::builder().sort(doc! { "title": 1,  }).build.yaml();
    // let projection = doc! {"userId": 1};
    let find_options = FindOptions::builder()
        // .projection(projection)
        .limit(10)
        .build();

    let mut cursor = collection
        // .clone_with_type()
        .find(None, find_options)
        .await
        .expect("failed fetching");
    let mut payload: Vec<Product> = Vec::new();

    while let Some(product) = cursor
        .try_next()
        .await
        .expect("Error mapping through cursor")
    {
        payload.push(product)
    }
    HttpResponse::Ok().json(payload)
}

#[delete("/products/{id}")]
pub async fn delete_product(client: web::Data<Client>, path: web::Path<String>) -> impl Responder {
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    let result = collection
        .delete_one(filter, None)
        .await
        .expect("failed deleting");
    if result.deleted_count == 1 {
        HttpResponse::Ok().json("successfully deleted!")
    } else {
        HttpResponse::NotFound().json("product with specified ID not found!")
    }
}

#[delete("/products")]
pub async fn delete_products(client: web::Data<Client>) -> impl Responder {
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    collection.drop(None).await.expect("failed deleting");
    HttpResponse::Ok().json("successfully deleted!")
}

// todo update the update function to use full struct!
#[put("/products/{id}")]
pub async fn update_product(
    client: web::Data<Client>,
    path: web::Path<String>,
    body: web::Json<Product>,
) -> impl Responder {
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    // let result = collection.update_one();
    let new_doc = doc! {
        "$set":
            {
                "name": body.name.clone()
            },
    };
    let result = collection
        .find_one_and_update(filter, new_doc, None)
        .await
        .ok();
    match result {
        Some(res) => HttpResponse::Ok().json(res),
        None => HttpResponse::Ok().json("ads"),
    }
}
