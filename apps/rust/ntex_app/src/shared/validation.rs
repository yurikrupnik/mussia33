use ntex::web::HttpResponse;
use validator::Validate;

/// Validates the request body and returns an `Err` with an appropriate `HttpResponse` if validation fails.
pub fn validate_request_body<T: Validate>(body: &T) -> Result<(), HttpResponse> {
    body.validate()
        .map_err(|e| HttpResponse::BadRequest().body(e.to_string()))
}
