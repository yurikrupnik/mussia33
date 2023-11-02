use utoipa::OpenApi;
use crate::todos;
use crate::books;
use rust_servers_shared::SecurityAddon;

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
),
components(
schemas(todos::Todo, todos::UpdateTodo, todos::CreateTodo),
schemas(books::Book, books::UpdateBook, books::CreateBook),
),
tags(
(name = "Todos", description = "Todo management endpoints."),
(name = "Books", description = "Books management endpoints."),
),
modifiers(&SecurityAddon)
)]
pub struct ApiDoc;
