// pub struct CryptoService {
//     pub secret: String,
//     pub salt: String,
// }
//
// impl CryptoService {
//     pub fn new(secret: String, salt: String) -> Self {
//         Self { secret, salt }
//     }
//
//     pub fn hash_password(&self, password: &str) -> Result<String, Error> {
//         let config = Config::default();
//         let hash = hash_with_config(password, &config)?;
//         Ok(hash)
//     }
//
//     pub fn verify_password(&self, password: &str, hash: &str) -> Result<bool, Error> {
//         let config = Config::default();
//         let is_valid = verify_with_config(password, hash, &config)?;
//         Ok(is_valid)
//     }
//
//     pub fn generate_token(&self, user: &User) -> Result<String, Error> {
//         let claims = Claims::new(user);
//         let token = encode(&Header::default(), &claims, self.secret.as_ref())?;
//         Ok(token)
//     }
//
//     pub fn decode_token(&self, token: &str) -> Result<Claims, Error> {
//         let token_data = decode::<Claims>(token, self.secret.as_ref(), &Validation::default())?;
//         Ok(token_data.claims)
//     }
// }