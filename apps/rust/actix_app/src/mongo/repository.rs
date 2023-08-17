use std::fmt::Display;
use futures::TryStreamExt;
use mongodb::{
    bson::{
        doc,
        oid::{Error, ObjectId},
    },
    results::DeleteResult,
    Client, Collection,
};
use mongodb::bson::Document;
use serde::{de::DeserializeOwned, Serialize};
use async_trait::*;

pub struct MongoRepo<T> {
    col: Collection<T>,
}

impl<T> MongoRepo<T>
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin,
{
    pub async fn init(db_name: &str, col_name: &str) -> Self {
        let uri =
            std::env::var("MONGO_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
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
        // let new_id = item.inserted_id.as_str().unwrap();
        let obj_id = item.inserted_id.as_object_id().unwrap();
        let filter = doc! {"_id": obj_id};
        // let result = self.find_by_id(filter).await.expect("Error finding item");
        // todo reuse find_by_id
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
    pub async fn list(&self) -> Result<Vec<T>, Error>
    where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static
    {
        // println!("query {:}",query);
        let mut cursor = self
            .col
            .find(None, None)
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
    pub async fn update_by_id(&self, id: &str) -> Result<Option<T>, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let new_doc = doc! {
            "$set":
                {
                    // "email": item.name.clone()
                },
        };
        let result = self
            .col
            .find_one_and_update(filter, new_doc, None)
            .await
            .expect("Error finding item");

        Ok(result)
    }
}

// #[async_trait]
// pub trait Api<T> {
//     fn list(&self) -> Result<Vec<T>, Error>;
//     fn drop_db(&self) -> Result<(), Error>;
//     fn find_by_id(&self, id: &str) -> Result<Option<T>, Error>;
//     fn update_by_id(&self, id: &str) -> Result<Option<T>, Error>;
//     // fn get_one(&self, db: MongoRepo<T>, body: web::Json<T>) -> Result<Option<T>, Error>;
//     // async fn create_item(&self, db: MongoRepo<T>, body: web::Json<T>) -> HttpResponse;
// }
//
// #[async_trait]
// impl<T> Api<T> for MongoRepo<T>
// where
//     T: Serialize + DeserializeOwned + Sync + Send + Unpin,
// {
//     async fn get_all(&self) -> HttpResponse {
//         let result = MongoRepo::list(self).await;
//         // let result = db.list().await;
//         match result {
//             Ok(res) => HttpResponse::Ok().json(res),
//             Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//         }
//     }
//     async fn get_one(&self, db: MongoRepo<T>, body: web::Json<T>) -> HttpResponse {
//         let result = self::MongoRepo::list(self).await;
//         // let result = dblist(self).await;
//         match result {
//             Ok(res) => HttpResponse::Ok().json(res),
//             Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//         }
//     }
// }
