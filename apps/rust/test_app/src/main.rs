use rust_proc_macros::{DbResource, Reflective};
use serde::{Deserialize, Serialize};

#[derive(Reflective, DbResource)]
struct Aris {
    x: String,
    y: u8,
}

#[derive(Serialize, Deserialize, DbResource, Reflective)]
// #[collection(pluralize)]
struct User {
    pub name: String,
    pub age: u8,
}

fn main() {
    // let st = String::from("aris");
    let url = User::URL;
    let coll = User::COLLECTION;
    let tag = User::TAG;
    let names = User::field_names();
    let name = User::name();
    println!("url {url}");
    println!("coll {coll}");
    println!("tag {tag}");
    println!("names {names:?}");
    println!("name {name}");
    // println!("sp {sp}");
    // println!("ssp {ssp}");
    // println!("{}", answer());
    // let users = Users {pagination: }

    // println!("{}", pluralize("story", 2, false)); // 2 Houses
    // println!("{}", pluralize("House", 2, false)); // 2 Houses
    //
    // // But also can convert to singular
    // println!("{}", pluralize("Houses", 1, true)); // 1 House
    //
    // let users = Users {
    //     pagination: Pagination {
    //         limit: 10,
    //         offset: 0,
    //         total: 100,
    //     },
    //     users: vec![
    //         User {
    //             name: String::from("Alice"),
    //             age: 30,
    //         },
    //         User {
    //             name: String::from("Bob"),
    //             age: 20,
    //         },
    //     ],
    // };
    //
    // let json_string = serde_json::to_string_pretty(&users).expect("Failed to serialize to JSON");
    // println!("jj {:?}", json_string);
    // let p = Aris {
    //     x: String::from("Alice"),
    //     y: 30,
    // };
    // println!("{}", p.name());
    // println!("{:?}", p.field_names());
    // println!("{:?}", p.field_values());
}
