use rust_proc_macros::Reflective;

#[derive(Reflective)]
pub struct Command {
    executable: String,
    args: Vec<String>,
    env: Vec<String>,
    current_dir: String,
}

#[derive(Reflective)]
pub struct User {
    id: String,
    email: String,
    password: String,
    admin: bool,
}

fn main() {
    let keys = Command::field_names();
    assert_eq!(keys, vec!["executable", "args", "env", "current_dir"]);

    let name = Command::name();
    assert_eq!(name, "Command");

    let keys = User::field_names();
    assert_eq!(keys, vec!["id", "email", "password", "admin"]);
    // changed the order of the fields, not equal to the order of the struct
    assert_ne!(keys, vec!["email", "id", "password", "admin"]);

    let name = User::name();
    assert_eq!(name, "User");
}
