// use proc_macro::TokenStream;
// use proc_macro2::{Ident, Span};
// use quote::quote;
// use syn::{self, Data, Fields, ItemStruct};
//
// #[proc_macro]
// pub fn generate_api_handlers(input: TokenStream) -> TokenStream {
//     // Parse the input as a Rust struct
//     let input = syn::parse_macro_input!(input as ItemStruct);
//     let struct_name = &input.ident;
//
//     // Generate the handler function for listing items
//     let list_handler = generate_list_handler(struct_name);
//
//     // Generate the handler function for creating items (if needed)
//
//     // Generate the handler function for updating items (if needed)
//
//     // Combine all generated code into a TokenStream
//     let result = quote! {
//         #list_handler
//     };
//
//     result.into()
// }
//
// fn generate_list_handler(struct_name: &Ident) -> proc_macro2::TokenStream {
//     // Generate the list handler function based on the struct name
//     quote! {
//         use actix_web::{Data, HttpResponse, Query, Responder};
//         use mongodb::{
//             bson::{self, doc, Document},
//             options::FindOptions,
//         };
//         use serde::{Deserialize, Serialize};
//         use serde_json::json;
//         use std::collections::HashMap;
//
//         struct MongoRepo<T>;
//
//         // Define the API-specific query parameters.
//         #[derive(Debug, Deserialize)]
//         struct QueryParams {
//             name: Option<String>,
//             email: Option<String>,
//             limit: Option<i64>,
//         }
//
//         impl std::fmt::Debug for #struct_name {
//             fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
//                 // Implement custom Debug formatting as needed for the struct
//                 // ...
//
//                 Ok(())
//             }
//         }
//
//         #[path(
//             get,
//             path = concat!("/api/", stringify!(#struct_name)),
//             responses(status = 200, description = stringify!(#struct_name), body = [#struct_name]),
//             params(name = "", email = "", limit = "")
//         )]
//         pub async fn list_items(
//             db: Data<MongoRepo<#struct_name>>,
//             query: Query<QueryParams>,
//         ) -> impl Responder {
//             let mut filter = Document::new();
//             if let Some(a) = &query.name {
//                 filter.insert("name", a);
//             }
//
//             if let Some(a) = &query.email {
//                 filter.insert("email", a);
//             }
//
//             let mut options = FindOptions::builder().build();
//             if let Some(limit) = &query.limit {
//                 options.limit = Some(limit.to_owned());
//             }
//
//             let results = db.list(filter, options, stringify!(#struct_name)).await;
//             match results {
//                 Ok(res) => HttpResponse::Ok().json(res),
//                 Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//             }
//         }
//     }
// }


// Usage:
// #[generate_api_handlers]
// struct User {
//     name: Option<String>,
//     email: Option<String>,
// }
//
// #[generate_api_handlers]
// struct Project {
//     name: Option<String>,
//     description: Option<String>,
// }