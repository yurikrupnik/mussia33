use super::handlers::*;
use salvo::prelude::*;

pub fn author_router() -> Router {
    Router::with_path("author")
        .push(Router::with_path("").get(get_authors))
        .post(create_author)
        .delete(drop_authors)
        .push(
            Router::with_path("<id>")
                .get(get_author)
                .put(update_author)
                .delete(delete_author),
        )
}
