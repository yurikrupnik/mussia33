extern crate serde;
extern crate serde_json;

use serde::{Serialize, Deserialize};
#[derive(Serialize, Deserialize, Debug)]
struct Person {
    name: String,
    age: u8,
}
fn main() {
    let person = Person { name: "Alice".to_string(), age: 30 };
    // let s = Person::from({"name":"Alice","age":30}});
    // Serialize to JSON string
    let serialized = serde_json::to_string(&person).unwrap();
    println!("Serialized: {}", serialized);
    // Deserialize from JSON string
    let deserialized: Person = serde_json::from_str(&serialized).unwrap();
    println!("Deserialized: {:?}", deserialized);
}