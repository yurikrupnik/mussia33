use super::model::Author;
use super::dto::{CreateDto, UpdateDto};
use validator::Validate;
use salvo::http::StatusCode;
use salvo::oapi::extract::*;
use salvo::prelude::*;
use super::super::mongo_pool;
use mongodb::{
  bson::{doc, from_document, oid::ObjectId, to_document, Document},
  options::{FindOneAndUpdateOptions, FindOptions, ReturnDocument},
  Collection,
};
use futures::TryStreamExt;

#[endpoint(status_codes(200, 409), tags("Authors"))]
pub async fn delete_author(id: PathParam<String>, res: &mut Response) {
  let id = id.into_inner();
  if id.is_empty() || id.len() != 24 {
    return res.status_code(StatusCode::BAD_REQUEST).render(Json("invalid ID"));
  };
  let obj_id = ObjectId::parse_str(id).unwrap();
  let filter = doc! {"_id": obj_id};
  let mongo_client = mongo_pool();
  let collection: Collection<Author> = mongo_client.database(Author::DB).collection(Author::COLLECTION);
  let result = collection
    .delete_one(filter, None)
    .await
    .expect("failed deleting");
  if result.deleted_count == 1 {
    res.status_code(StatusCode::OK).render(Json("successfully deleted!"))
  } else {
    res.status_code(StatusCode::NOT_FOUND).render(Json("product with specified ID not found!"))
  }
}

#[endpoint(status_codes(200, 409), tags("Authors"))]
pub async fn get_author(id: PathParam<String>, res: &mut Response) {
  let _id = id.into_inner();
  if _id.is_empty() || _id.len() != 24 {
    res.status_code(StatusCode::BAD_REQUEST).render(Json(format!("Invalid ID: {}", &_id)))
  };
  let mongo_client = mongo_pool();
  let collection: Collection<Document> = mongo_client.database(Author::DB).collection(Author::COLLECTION);
  let obj_id = ObjectId::parse_str(_id).unwrap();
  let filter = doc! {"_id": obj_id};
  let result = collection.find_one(filter, None).await;
  match result {
    Ok(Some(payload)) => res.status_code(StatusCode::OK).render(Json(payload)),
    Ok(None) => res.status_code(StatusCode::NOT_FOUND).render(Json(format!("No product found with id {obj_id}"))),
    Err(err) => res.status_code(StatusCode::INTERNAL_SERVER_ERROR).render(Json(err.to_string()))
  }
}

#[endpoint(status_codes(200, 409), tags("Authors"))]
pub async fn drop_authors(res: &mut Response) {
  let mongo_client = mongo_pool();
  let collection: Collection<Author> = mongo_client.database(Author::DB).collection(Author::COLLECTION);
  collection.drop(None).await.expect("failed deleting");
  res.status_code(StatusCode::OK).render(Json("Deleted successfully!"))
}

#[endpoint(status_codes(200, 409), tags("Authors"))]
pub async fn update_author(body: JsonBody<UpdateDto>, id: PathParam<String>, res: &mut Response) {
  let id = id.into_inner();
  let body = body.into_inner();
  // validate_body(Box::new(&body), res);
  if id.is_empty() || id.len() != 24 {
    res.status_code(StatusCode::BAD_REQUEST).render(Json(format!("Invalid ID: {}", id)))
  };
  let obj_id = ObjectId::parse_str(id).unwrap();
  let filter = doc! {"_id": obj_id};
  let mongo_client = mongo_pool();
  let collection: Collection<Document> = mongo_client.database(Author::DB).collection(Author::COLLECTION);
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
      let doc: Author = from_document(payload).unwrap();
      res.status_code(StatusCode::CREATED).render(Json(doc))
    }
    None => res.status_code(StatusCode::NOT_FOUND).render(Json("not found item")),
  }
}

#[endpoint(status_codes(200, 409), tags("Authors"))]
pub async fn get_authors(name: QueryParam<String, false>, res: &mut Response) {
  let mongo_client = mongo_pool();
  let collection: Collection<Author> = mongo_client.database(Author::DB).collection(Author::COLLECTION);
  let find_options = FindOptions::builder()
    .limit(10)
    .build();

  let mut cursor = collection
    .find(None, find_options)
    .await
    .expect("failed fetching");
  let mut payload: Vec<Author> = Vec::new();

  while let Some(product) = cursor
    .try_next()
    .await
    .expect("Error mapping through cursor")
  {
    payload.push(product)
  }
  res.status_code(StatusCode::OK).render(Json(payload))
}

#[endpoint(status_codes(201, 409), tags("Authors"))]
pub async fn create_author(body: JsonBody<CreateDto>, res: &mut Response) {
  let body = body.into_inner();
  match body.validate() {
    Ok(_) => (),
    Err(e) => {
      return res.status_code(StatusCode::BAD_REQUEST).render(Json(e.errors()));
    }
  }
  let s = mongo_pool();
  let db: Collection<Document> = s.database(Author::DB).collection(Author::COLLECTION);
  let document = to_document(&body).unwrap();
  let result = db
    .insert_one(document, None)
    .await
    .expect("Error creating item");
  let new_id = result.inserted_id.as_object_id().unwrap();
  let response = db.find_one(doc! {"_id": new_id}, None).await;
  match response {
    Ok(Some(payload)) => {
      let doc: Author = from_document(payload).unwrap();
      res.status_code(StatusCode::CREATED).render(Json(doc))
    }
    Ok(None) => res.status_code(StatusCode::NOT_FOUND).render(Json(format!("No user found with id {new_id}"))),
    Err(err) => res.status_code(StatusCode::INTERNAL_SERVER_ERROR).render(Json(err.to_string())),
  }
}


