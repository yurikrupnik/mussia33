use rust_proc_macros::DbResource;
use rust_proc_macros::Reflective;

#[derive(DbResource, Reflective)]
pub struct Command;

#[derive(DbResource, Reflective)]
pub struct User;

#[derive(DbResource, Reflective)]
pub struct Story;

fn command_test() {
    let collection = Command::COLLECTION;
    let url = Command::URL;
    let tag = Command::TAG;
    let shit = Command::SHIT;
    assert_eq!("shit", shit);
    assert_eq!("commands", collection);
    assert_eq!("/command", url);
    assert_eq!("Commands", tag);
}

fn user_test() {
    let collection = User::COLLECTION;
    let url = User::URL;
    let tag = User::TAG;
    assert_eq!("users", collection);
    assert_eq!("/user", url);
    assert_eq!("Users", tag);
}

fn story_test() {
    let collection = Story::COLLECTION;
    let url = Story::URL;
    let tag = Story::TAG;
    assert_eq!("stories", collection);
    assert_eq!("/story", url);
    assert_eq!("Stories", tag);
}
fn main() {
    command_test();
    user_test();
    story_test();
}
