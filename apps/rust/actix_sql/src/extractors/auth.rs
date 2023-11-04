use std::future::{Ready, ready};
use actix_web::{
    dev::Payload, FromRequest, HttpRequest,
    // http::{
    //     header::{AUTHORIZATION,
        // HeaderValue,
    // }},
    // error::ErrorUnauthorized,
    Error
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Auth {
    pub id: usize,
    // pub id: i32,
}

impl FromRequest for Auth {
    type Error = Error;
    type Future = Ready<Result<Self, Self::Error>>;
    // type Config = ();

    fn from_request(_req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let auth = Auth {
            id: 1,
            // id: 1,
        };
        // let auth_header = req.headers()
        //     .get(AUTHORIZATION);
        // let auth_token = auth_header.unwrap().to_str().unwrap_or("");
        // if auth_token.is_empty() {
        //     // return Err(ErrorUnauthorized("Missing auth token"));
        //     return ready(Err(ErrorUnauthorized("Missing auth token")));
        // }
        // let secret = req.app_data::<String>().unwrap();

        ready(Ok(auth))
    }
}