extern crate proc_macro;
use pluralizer::pluralize;
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

// TODO test proc macro with attributes(collection)
#[proc_macro_derive(DbResource)]
pub fn db_resource_derive_macro(input: TokenStream) -> TokenStream {
    // parse
    let ast: DeriveInput = parse_macro_input!(input as DeriveInput);
    // generate
    impl_db_resource_macro(ast)
}

// enum CollectionBehavior {
//     Default,
//     Pluralize,
//     Singularize,
// }
fn capitalize_first_letter(input: &str) -> String {
    if input.is_empty() {
        return input.to_owned();
    }

    input
        .char_indices()
        .fold(String::with_capacity(input.len()), |mut acc, (i, c)| {
            if i == 0 {
                acc.push_str(&c.to_uppercase().to_string());
            } else {
                acc.push(c);
            }
            acc
        })
}

fn impl_db_resource_macro(ast: DeriveInput) -> TokenStream {
    // get struct identifier
    let ident = &ast.ident;
    let name = ident.to_string().to_lowercase();
    let url = format!("/{}", name);
    let collection = pluralize(name.as_str(), 2, false);
    let tag = capitalize_first_letter(&collection);

    // generate implementation
    let gen = quote! {
        impl DbResource for #ident {
            const SHIT: &'static str = #url;
            const SHIT1: &'static str = #name;
            const URL: &'static str = #url;
            const COLLECTION: &'static str = #collection;
            const TAG: &'static str = #tag;
        }
    };
    gen.into()
}
