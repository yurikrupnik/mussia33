use super::handlers::*;
use salvo::prelude::*;

pub fn user_router() -> Router {
    Router::with_path("user")
        .push(Router::with_path("").get(get_users))
        .post(create_user)
        .delete(drop_users)
        .push(
            Router::with_path("<id>")
                .get(get_user)
                .put(update_user)
                .delete(delete_user),
        )
}
