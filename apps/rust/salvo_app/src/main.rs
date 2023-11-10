use salvo::http::{StatusCode, StatusError};
use salvo::oapi::extract::*;
use salvo::oapi::{self, EndpointOutRegister, ToSchema};
use salvo::prelude::*;

struct App {}
impl App {
    pub const TAG: &'static str = "Products";
    fn get_tag() -> String {
        "Tags".to_string()
    }
}

/// This is a summary of the operation
///
/// All lines of the doc comment will be included to operation description.
#[endpoint(status_codes(200, 409), tags("Default"))]
async fn hello(name: QueryParam<String, false>) -> String {
    format!("Hello, {}!", name.as_deref().unwrap_or("World"))
}

#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize, ToSchema)]
struct Todo {
    id: u64,
    text: String,
    completed: bool,
}
// #[endpoint(status_codes(201))]
// pub async fn create_todo(new_todo: JsonBody<Todo>) -> Result<StatusCode, Err> {
//   Ok(StatusCode::CREATED)
// }

// impl EndpointOutRegister for Error {
//   fn register(components: &mut oapi::Components, operation: &mut oapi::Operation) {
//     operation.responses.insert(
//       StatusCode::INTERNAL_SERVER_ERROR.as_str(),
//       oapi::Response::new("Internal server error").add_content("application/json", StatusError::to_schema(components)),
//     );
//     operation.responses.insert(
//       StatusCode::NOT_FOUND.as_str(),
//       oapi::Response::new("Not found").add_content("application/json", StatusError::to_schema(components)),
//     );
//     operation.responses.insert(
//       StatusCode::BAD_REQUEST.as_str(),
//       oapi::Response::new("Bad request").add_content("application/json", StatusError::to_schema(components)),
//     );
//   }
// }

/// This is a summary of the operation
///
/// All lines of the doc comment will be included to operation description.
#[endpoint(status_codes(200, 409), tags("Default"))]
async fn hallo(name: QueryParam<String, false>) -> String {
    format!("Hallo, {}!", name.as_deref().unwrap_or("World"))
}

#[endpoint(status_codes(201, 409), tags("Default"))]
async fn create_todo(name: QueryParam<String, false>) -> String {
    // let s = name.iter().map(|x| x.text.clone()).collect::<Vec<String>>().join(",");
    // format!("Create todo, {}!", name.as_deref().unwrap_or("World"))
    format!("create_todo, {}!", name.as_deref().unwrap_or("World"))
}

#[endpoint(status_codes(200, 409), tags("Default"))]
async fn get_todo(name: QueryParam<String, false>) -> String {
    // let s = name.iter().map(|x| x.text.clone()).collect::<Vec<String>>().join(",");
    // format!("Create todo, {}!", name.as_deref().unwrap_or("World"))
    format!("create_todo, {}!", name.as_deref().unwrap_or("World"))
}

#[endpoint(status_codes(200, 409), tags("Default"))]
async fn get_todos(name: QueryParam<String, false>) -> String {
    // let s = name.iter().map(|x| x.text.clone()).collect::<Vec<String>>().join(",");
    // format!("Create todo, {}!", name.as_deref().unwrap_or("World"))
    format!("create_todos, {}!", name.as_deref().unwrap_or("World"))
}

fn new_route() -> Router {
    Router::with_path("/api")
        .push(Router::with_path("hello").get(hallo))
        .push(Router::with_path("hallo").get(hello))
        .push(Router::with_path("todo:{id}").get(get_todo))
        .push(Router::with_path("todo").get(get_todos))
        .push(Router::with_path("todo").post(create_todo))
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().init();

    let router = Router::new()
        .push(new_route())
        .push(Router::with_path("hello").get(hello));

    let doc = OpenApi::new("Salvo Api", "0.0.1").merge_router(&router);

    let router = router
        .push(doc.into_router("/api-doc/openapi.json"))
        .push(SwaggerUi::new("/api-doc/openapi.json").into_router("swagger-ui"));

    let acceptor = TcpListener::new("0.0.0.0:8080").bind().await;
    Server::new(acceptor).serve(router).await;
}
