use futures::TryStreamExt;
use mongodb::{
    options::{
        FindOptions, ReturnDocument, FindOneAndUpdateOptions
    },
    bson::{
        Document,
        doc,
        oid::{Error, ObjectId},
        to_document,
    },
    results::DeleteResult,
    Client, Collection,
};
use serde::{de::DeserializeOwned, Serialize};


pub struct MongoRepository<T> {
    col: Collection<T>,
}

impl<T> MongoRepository<T>
    where
        T: Serialize + DeserializeOwned + Sync + Send + Unpin,
{
    pub async fn new(db_name: &str, col_name: &str) -> Self {
        let uri = std::env::var("MONGO_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
        let client = Client::with_uri_str(uri).await.expect("failed to connect");
        let col = client.database(db_name).collection(col_name);
        Self { col }
    }
    pub async fn create(&self, item: T) -> Result<Option<T>, Error> {
        let item = self
            .col
            .insert_one(item, None)
            .await
            .expect("Error creating item");
        let obj_id = item.inserted_id.as_object_id().unwrap();
        let filter = doc! {"_id": obj_id};
        let result = self.col.find_one(filter, None).await.expect("Error finding item");
        Ok(result)
    }
    pub async fn delete(&self, id: &str) -> Result<DeleteResult, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let user_detail = self
            .col
            .delete_one(filter, None)
            .await
            .expect("Error deleting item");

        Ok(user_detail)
    }
    pub async fn drop_db(&self) -> Result<(), Error> {
        self.col
            .drop(None)
            .await
            .expect("Error dropping collection");
        Ok(())
    }
    pub async fn list(&self, filter: Document, options: FindOptions) -> Result<Vec<T>, Error> {
        let mut cursor = self
            .col
            .find(filter, options)
            .await
            .expect("Error getting list of users");
        let mut data: Vec<T> = Vec::new();
        while let Some(item) = cursor
            .try_next()
            .await
            .expect("Error mapping through cursor")
        {
            data.push(item)
        }
        Ok(data)
    }
    pub async fn find_by_id(&self, id: &str) -> Result<Option<T>, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let result = self
            .col
            .find_one(filter, None)
            .await
            .expect("Error finding item");

        Ok(result)
    }
    pub async fn update_by_id(&self, id: &str, item: T) -> Result<Option<T>, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let serialized_item = to_document(&item).expect("Error serializing item");
        let new_doc = doc! {
            "$set": serialized_item
        };

        let options = FindOneAndUpdateOptions::builder()
            .return_document(ReturnDocument::After)
            .build();

        let result = self
            .col
            .find_one_and_update(filter, new_doc, options)
            .await
            .expect("Error finding item");

        Ok(result)
    }
}
// use async_trait::async_trait;
// use actix_web::{web::{Json, Data}, HttpResponse};
// use validator::Validate;


// TODO finish this - pay attention to response types
// #[async_trait]
// trait MongoCrud<T, U>
// where
//     T: Serialize + DeserializeOwned + Sync + Send + Unpin + Validate + 'static,
//     U: Serialize + DeserializeOwned + Sync + Send + Unpin + Validate + 'static,
// {
//     async fn create_item(db: Data<MongoRepository<T>>, body: Json<U>) -> HttpResponse {
//         match body.validate() {
//             Ok(_) => (),
//             Err(e) => {
//                 return HttpResponse::BadRequest().json(e.errors());
//             }
//         }
//         let result = db.create(body.into_inner()).await;
//         match result {
//             Ok(res) => HttpResponse::Ok().json(res),
//             Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//         }
//     }
// }
// async fn create(&self, item: T) -> Result<Option<T>, Error>;
// async fn delete(&self, id: &str) -> Result<DeleteResult, Error>;

// struct Shit {
//     pub name: String,
// }
// #[async_trait]
// impl<T> MongoCrud<T> for Shit
//     where
//         T: Serialize + DeserializeOwned + Sync + Send + Unpin + Validate + 'static,
// {}
//
//
// #[async_trait]
// impl<T> MongoCrud<T> for MongoRepository<T>
//     where
//         T: Serialize + DeserializeOwned + Sync + Send + Unpin + Validate + 'static,
// {}

// #[async_trait]

// #[async_trait]
// pub trait Api<T> {
//     async fn get_all(&self) -> HttpResponse;
//     async fn get_one(&self, db: MongoRepository<T>, body: web::Json<T>) -> HttpResponse;
//     // async fn create_item(&self, db: MongoRepository<T>, body: web::Json<T>) -> HttpResponse;
// }
//
// #[async_trait]
// impl<T> Api<T> for MongoRepository<T>
// where
//     T: Serialize + DeserializeOwned + Sync + Send + Unpin,
// {
//     async fn get_all(&self) -> HttpResponse {
//         let result = MongoRepository::list(self).await;
//         // let result = db.list().await;
//         match result {
//             Ok(res) => HttpResponse::Ok().json(res),
//             Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//         }
//     }
//     async fn get_one(&self, db: MongoRepository<T>, body: web::Json<T>) -> HttpResponse {
//         let result = self::MongoRepository::list(self).await;
//         // let result = dblist(self).await;
//         match result {
//             Ok(res) => HttpResponse::Ok().json(res),
//             Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//         }
//     }
// }
