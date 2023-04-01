pub fn mongo() -> String {
    "mongo".into()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(mongo(), "mongo".to_string());
    }
}
