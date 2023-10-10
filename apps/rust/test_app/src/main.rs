use rust_proc_macros::{Reflective};
use serde::{Deserialize, Serialize};

#[derive(Reflective)]
struct Aris {
    x: String,
    y: u8,
}

#[derive(Serialize, Deserialize)]
struct User {
    pub name: String,
    pub age: u8,
}

#[derive(Serialize, Deserialize)]
struct Pagination {
    limit: u64,
    offset: u64,
    total: u64,
}

#[derive(Serialize, Deserialize)]
struct Users {
    users: Vec<User>,

    #[serde(flatten)]
    pagination: Pagination,
}
fn main() {
    // println!("{}", answer());
    // let users = Users {pagination: }

    let users = Users {
        pagination: Pagination {
            limit: 10,
            offset: 0,
            total: 100,
        },
        users: vec![
            User {
                name: String::from("Alice"),
                age: 30,
            },
            User {
                name: String::from("Bob"),
                age: 20,
            },
        ],
    };

    let json_string = serde_json::to_string_pretty(&users).expect("Failed to serialize to JSON");
    println!("jj {:?}", json_string);
    let p = Aris {
        x: String::from("Alice"),
        y: 30,
    };
    println!("{}", p.name());
    println!("{:?}", p.field_names());
    // println!("{:?}", p.field_values());
}