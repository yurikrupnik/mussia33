const PORT_STR: &str = "PORT";
const DEFAULT_PORT: &str = "8080";
pub fn get_env_port() -> u16 {
    std::env::var(PORT_STR)
        .unwrap_or(DEFAULT_PORT.to_string())
        .parse::<u16>()
        .unwrap()
}

const DEFAULT_MONGO_URI: &str = "mongodb://localhost:27017";
const MONGO_STR: &str = "MONGO_URI";
pub fn get_mongo_uri() -> String {
    std::env::var(MONGO_STR).unwrap_or(DEFAULT_MONGO_URI.into())
}


use actix_web::{HttpResponse};
pub async fn get_status() -> HttpResponse {
    HttpResponse::Ok().finish()
}

#[cfg(test)]
mod tests {
    use crate::{get_env_port, get_mongo_uri, PORT_STR, DEFAULT_PORT, DEFAULT_MONGO_URI};

    struct TestFixture {
        port: u16,
    }

    impl TestFixture {
        fn new() -> Self {
            let port = std::env::var(PORT_STR)
                .unwrap_or(DEFAULT_PORT.to_string())
                .parse::<u16>()
                .unwrap();
            TestFixture { port }
        }

        fn set_env_port(&self, port: u16) {
            std::env::set_var(PORT_STR, port.to_string());
        }

        fn restore_env_port(&self) {
            std::env::set_var(PORT_STR, self.port.to_string());
        }
    }

    #[test]
    fn default_get_env_port() {
        let fixture = TestFixture::new();
        let port = get_env_port();
        assert_eq!(port, 8080);
        fixture.restore_env_port();
    }

    #[test]
    fn custom_get_env_port() {
        let fixture = TestFixture::new();
        fixture.set_env_port(7000);
        let port = get_env_port();
        assert_eq!(port, 7000);
        fixture.restore_env_port();
    }

    #[test]
    fn default_get_mongo_uri() {
        let fixture = TestFixture::new();
        let uri = get_mongo_uri();
        assert_eq!(uri, DEFAULT_MONGO_URI);
        fixture.restore_env_port();
    }

    // #[test]
    // fn custom_get_mongo_uri() {
    //     let fixture = TestFixture::new();
    //     fixture.set_env_port(7000);
    //     let uri = get_mongo_uri();
    //     assert_eq!(uri, 7000);
    //     fixture.restore_env_port();
    // }
}