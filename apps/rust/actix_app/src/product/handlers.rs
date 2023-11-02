use crate::product::dto::{CreateDto, UpdateDto};
use crate::product::model::Product;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use futures::TryStreamExt;
use mongodb::{
    bson::{doc, from_document, oid::ObjectId, to_document, Document},
    options::{FindOneAndUpdateOptions, FindOptions, ReturnDocument},
    Client, Collection,
};
use validator::Validate;

pub const DB_NAME: &str = "test";
// pub const DB_NAME: &str = "rustApp";

/// Create new Product to shared in mongodb.
///
/// Post a new `Product` in request body as json to store it. Api will return
/// created `Product` on success or `ErrorResponse::Conflict` if product with same id already exists.
///
/// One could call the api with.
/// ```text
/// curl localhost:8080/api/product -d '{"name": "Product 2"}'
/// ```
#[utoipa::path(
path = "/api/product",
tag = Product::TAG,
request_body = CreateDto,
responses(
(status = CREATED, description = "Product created successfully", body = Product),
(status = BAD_REQUEST, description = "Json deserialize error")
)
)]
#[post("/product")]
pub async fn add_product(client: web::Data<Client>, body: web::Json<CreateDto>) -> impl Responder {
    match body.validate() {
        Ok(_) => (),
        Err(e) => {
            return HttpResponse::BadRequest().json(e.errors());
        }
    }
    let collection: Collection<Document> = client.database(DB_NAME).collection(Product::COLLECTION);
    let document = to_document(&body).unwrap();
    let result = collection
        .insert_one(document, None)
        .await
        .expect("Error creating item");
    let new_id = result.inserted_id.as_object_id().unwrap();
    let res = collection.find_one(doc! {"_id": new_id}, None).await;
    match res {
        Ok(Some(payload)) => {
            let doc: Product = from_document(payload).unwrap();
            HttpResponse::Created().json(doc)
        }
        Ok(None) => HttpResponse::NotFound().body(format!("No user found with id {new_id}")),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[utoipa::path(
path = "/api/product/{id}",
tag = Product::TAG,
params(
("id" = String, description = "Unique id of Item to get")
),
responses(
(status = 200, description = "Product created successfully", body = Product),
)
)]
#[get("/product/{id}")]
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
/// curl localhost:8080/api/products
/// ```
#[utoipa::path(
path = "/api/product",
tag = Product::TAG,
responses(
(status = 200, description = "List current product items", body = [Product])
)
)]
#[get("/product")]
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

#[utoipa::path(
path = "/api/product/{id}",
tag = Product::TAG,
params(
("id" = String, description = "Id of item to delete")
),
responses(
(status = 200, description = "Product deleted successfully", body = Product),
)
)]
#[delete("/product/{id}")]
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

#[utoipa::path(
path = "/api/product",
tag = Product::TAG,
responses(
(status = 200, description = "Product deleted successfully"),
)
)]
#[delete("/product")]
pub async fn delete_products(client: web::Data<Client>) -> impl Responder {
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    collection.drop(None).await.expect("failed deleting");
    HttpResponse::Ok().json("successfully deleted!")
}

// todo update the update function to use full struct!
#[utoipa::path(
path = "/api/product/{id}",
tag = Product::TAG,
request_body = UpdateDto,
responses(
(status = 200, description = "Product deleted successfully", body = Product),
(status = NOT_FOUND, description = "ERROR HERE"),
)
)]
#[put("/product/{id}")]
pub async fn update_product(
    client: web::Data<Client>,
    path: web::Path<String>,
    body: web::Json<UpdateDto>,
) -> impl Responder {
    match body.validate() {
        Ok(_) => (),
        Err(e) => {
            return HttpResponse::BadRequest().json(e.errors());
        }
    }
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let collection: Collection<Document> = client.database(DB_NAME).collection(Product::COLLECTION);
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
            let doc: Product = from_document(payload).unwrap();
            HttpResponse::Created().json(doc)
        }
        None => HttpResponse::NotFound().json("not found item"),
    }
}
