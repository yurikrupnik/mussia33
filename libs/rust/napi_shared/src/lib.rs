#[macro_use]
extern crate napi_derive;

const PORT_STR: &str = "PORT";
const DEFAULT_PORT: &str = "8080";

#[napi]
pub fn get_env_port() -> u16 {
    std::env::var(PORT_STR)
        .unwrap_or(DEFAULT_PORT.to_string())
        .parse::<u16>()
        .unwrap()
}
