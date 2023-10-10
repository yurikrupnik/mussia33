
// extern crate proc_macro;
// use proc_macro::TokenStream;
// use quote::quote;
// use syn;

// #[proc_macro]
// pub fn make_answer(input: TokenStream) -> TokenStream {
//     "fn answer() -> u32 { 42 }".parse().unwrap()
// }

pub use reflective_derive::Reflective;

pub trait Reflective {
    fn name(&self) -> &'static str;
    fn field_names(&self) -> Vec<&'static str>;
    // fn field_values(&self) -> Vec<String>;
}
