use crate::mongo::ErrorResponse;
use utoipa::OpenApi;
use rust_servers_shared::{SecurityAddon};
use crate::product;
use crate::todo;
use crate::user;
use rust_author_api::author;
use rust_books_api::book;

#[derive(OpenApi)]
#[openapi(
paths(
todo::get_todos,
todo::create_todo,
todo::delete_todo,
todo::get_todo_by_id,
todo::update_todo,
todo::search_todos,
user::user_list,
user::add_user,
user::delete_user,
user::drop_users,
user::get_user,
user::update_user,
book::list_book,
book::create_book,
author::create_author,
author::list_author,
),
components(
schemas(todo::Todo, todo::TodoUpdateRequest, ErrorResponse),
schemas(user::User),
schemas(book::Book),
schemas(author::Author),
),
tags(
(name = "todo", description = "Todo management endpoints."),
(name = "Users", description = "Users management endpoints."),
(name = "Books", description = "Books management endpoints."),
(name = "Authors", description = "Books management endpoints."),
),
modifiers(&SecurityAddon)
)]
pub struct ApiDoc;

#[derive(OpenApi)]
#[openapi(
paths(
product::add_product,
product::get_products,
product::update_product,
product::get_product,
product::delete_product,
product::delete_products,
),
components(
schemas(product::Product, product::CreateDto, product::UpdateDto, ErrorResponse),
),
tags(
(name = "Products", description = "Products management endpoints."),
),
modifiers(&SecurityAddon)
)]
pub struct ApiDoc1;
