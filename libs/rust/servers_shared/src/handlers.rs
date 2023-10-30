use actix_web::HttpResponse;

pub async fn get_status() -> HttpResponse {
    HttpResponse::Ok().finish()
}
