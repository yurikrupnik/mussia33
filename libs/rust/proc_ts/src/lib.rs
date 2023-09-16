#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
    a + b
}


#[napi]
pub fn multi(a: i32, b: i32) -> i32 {
  a * b
}

// #[napi]
// pub fn capital(s: &str) -> String {
//   // let mut v: Vec<char> = s.chars().collect();
//   // v[0] = v[0].to_uppercase().nth(0).unwrap();
//   // let s2: String = v.into_iter().collect();
//   "sda".to_string()
// }

struct Person {
  name: String,
  age: i32,

}

fn some_kind_of_uppercase_first_letter(s: &str) -> String {
  let mut c = s.chars();
  match c.next() {
    None => String::new(),
    Some(f) => f.to_uppercase().chain(c).collect(),
  }
}

#[napi]
fn runner(mut s: String) {
  // println!("will print this in js {s:?}")
  let r = s.remove(0).to_uppercase().to_string() + &s;
}
// fn main() {
//   println!("{}", some_kind_of_uppercase_first_letter("joe"));
//   println!("{}", some_kind_of_uppercase_first_letter("jill"));
//   println!("{}", some_kind_of_uppercase_first_letter("von Hagen"));
//   println!("{}", some_kind_of_uppercase_first_letter("ß"));
// }
