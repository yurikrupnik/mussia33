use actix_web::HttpResponse;
use salvo::basic_auth::{BasicAuth, BasicAuthValidator};
use salvo::http::{StatusCode, StatusError};
use salvo::oapi::extract::*;
use salvo::oapi::{self, EndpointOutRegister, ToSchema};
use salvo::prelude::*;

pub async fn get_status() -> HttpResponse {
    HttpResponse::Ok().finish()
}

#[endpoint(status_codes(200, 409), tags("Default"))]
pub async fn get_handler(name: QueryParam<String, false>) -> String {
    // let s = name.iter().map(|x| x.text.clone()).collect::<Vec<String>>().join(",");
    // format!("Create todo, {}!", name.as_deref().unwrap_or("World"))
    format!("create_todo, {}!", name.as_deref().unwrap_or("World"))
}

#[endpoint(status_codes(200, 409), tags("Default"))]
async fn hello() -> &'static str {
    "Hello"
}

fn route() -> Router {
    let auth_handler = BasicAuth::new(Validator);
    Router::with_hoop(auth_handler).goal(hello)
}

struct Validator;
#[async_trait]
impl BasicAuthValidator for Validator {
    async fn validate(&self, username: &str, password: &str, _depot: &mut Depot) -> bool {
        username == "root" && password == "pwd"
    }
}

static INDEX_HTML: &str = r#"<!DOCTYPE html>
<html>
    <head>
        <title>WS</title>
    </head>
    <body>
        <h1>WS</h1>
        <div id="status">
            <p><em>Connecting...</em></p>
        </div>
        <script>
            const status = document.getElementById('status');
            const msg = document.getElementById('msg');
            const submit = document.getElementById('submit');
            const ws = new WebSocket(`ws://${location.host}/ws?id=123&name=dddf`);

            ws.onopen = function() {
                status.innerHTML = '<p><em>Connected!</em></p>';
            };
        </script>
    </body>
</html>
"#;
