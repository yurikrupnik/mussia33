use actix_cors::Cors;

pub fn set_cors() -> Cors {
    Cors::default()
        // .allowed_origin("http://localhost:5173")
        .allowed_origin_fn(|origin, _req_head| {
            print!("origin!! {}, url!! {}", origin.is_empty(), _req_head.uri);
            true
        })
        .allowed_methods(vec!["GET", "POST", "DELETE", "PUT"])
        .max_age(3600)
}
