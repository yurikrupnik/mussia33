use env_logger::Env;

pub fn set_logger(log_level: Option<&str>) {
    env_logger::init_from_env(Env::default()
        .default_filter_or(log_level.unwrap_or("info")));
}