const PORT_STR: &str = "PORT";
const DEFAULT_PORT: &str = "8080";
pub fn get_env_port() -> u16 {
    std::env::var(PORT_STR)
        .unwrap_or(DEFAULT_PORT.to_string())
        .parse::<u16>()
        .unwrap()
}

#[cfg(test)]
mod tests {
    use crate::{get_env_port, PORT_STR, DEFAULT_PORT};

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
}