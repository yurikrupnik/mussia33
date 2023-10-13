const PORT_STR: &str = "PORT";
const DEFAULT_PORT: &str = "8080";

const MONGO_STR: &str = "MONGO_URI";
const DEFAULT_MONGO_URI: &str = "mongodb://localhost:27017";

const REDIS_STR: &str = "REDIS_HOST";
const DEFAULT_REDIS_URI: &str = "redis://localhost:6379";

fn get_env_variable(variable_name: &str, default_value: &str) -> String {
    std::env::var(variable_name)
        .unwrap_or(default_value.to_string())
}

pub fn get_mongo_uri() -> String {
    get_env_variable(MONGO_STR, DEFAULT_MONGO_URI)
}

pub fn get_redis_uri() -> String {
    get_env_variable(REDIS_STR, DEFAULT_REDIS_URI)
}

pub fn get_port() -> u16 {
    get_env_variable(PORT_STR, DEFAULT_PORT)
        .parse()
        .unwrap_or(8080)
}