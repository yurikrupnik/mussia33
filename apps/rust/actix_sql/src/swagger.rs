use crate::books;
use crate::todos;
use crate::users;
use rust_servers_shared::SecurityAddon;
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
paths(
todos::delete_todo,
todos::drop_todos,
todos::update_todo,
todos::get_todos,
todos::get_todo,
todos::create_todo,
books::get_book,
books::get_books,
books::delete_book,
books::create_book,
books::drop_books,
books::update_book,
users::get_user,
users::get_users,
users::delete_user,
users::create_user,
users::drop_users,
users::update_user,
),
components(
schemas(todos::Todo, todos::UpdateTodo, todos::CreateTodo),
schemas(books::Book, books::UpdateBook, books::CreateBook),
schemas(users::User, users::NewUser, users::UpdateProfile),
),
tags(
(name = "Todos", description = "Todo management endpoints."),
(name = "Books", description = "Books management endpoints."),
(name = "Users", description = "Users management endpoints."),
),
modifiers(&SecurityAddon)
)]
pub struct ApiDoc;
