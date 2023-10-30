use rust_proc_macros::DbResource;

#[derive(DbResource)]
pub struct Command;

#[derive(DbResource)]
pub struct User;

#[derive(DbResource)]
pub struct Story;

fn command_test() {
    let collection = Command::COLLECTION;
    let url = Command::URL;
    let tag = Command::TAG;
    assert_eq!("commands", collection);
    assert_eq!("/api/command", url);
    assert_eq!("Commands", tag);
}

fn user_test() {
    let collection = User::COLLECTION;
    let url = User::URL;
    let tag = User::TAG;
    assert_eq!("users", collection);
    assert_eq!("/api/user", url);
    assert_eq!("Users", tag);
}

fn story_test() {
    let collection = Story::COLLECTION;
    let url = Story::URL;
    let tag = Story::TAG;
    assert_eq!("stories", collection);
    assert_eq!("/api/story", url);
    assert_eq!("Stories", tag);
}
fn main() {
    command_test();
    user_test();
    story_test();
}
