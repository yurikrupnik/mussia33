mod errors;
mod repository;
mod serialize;

pub use errors::*;
pub use repository::*;
pub use serialize::*;

// #[cfg(test)]
// mod tests {
//     use super::*;
//
//     #[test]
//     fn it_works() {
//         assert_eq!(mongo(), "mongo".to_string());
//     }
// }
