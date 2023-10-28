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
        return String::from(input);
    }

    let mut chars = input.chars();
    if let Some(first_char) = chars.next() {
        let capitalized = first_char.to_uppercase().collect::<String>();
        let rest = chars.collect::<String>();
        format!("{}{}", capitalized, rest)
    } else {
        String::from(input)
    }
}

fn impl_db_resource_macro(ast: DeriveInput) -> TokenStream {
    // get struct identifier
    let ident = &ast.ident;
    let name = ident.to_string().to_lowercase();
    let url = format!("/api/{}", name);
    let collection = pluralize(name.as_str(), 2, false);
    let tag = capitalize_first_letter(&collection);

    // TODO handle attributes
    // for attr in ast.attrs {
    //     if attr.path().is_ident("collection") {
    //         let meta = attr.parse_args().unwrap();
    //         match meta {
    //             Meta::NameValue(MetaNameValue { value: Lit::Str(lit_str), .. }) => {
    //                 // Get the value of the "collection" attribute
    //                 let lit_str_value = lit_str.value();
    //                 let collection_value = Expr::Lit(Lit::Str(lit_str.clone()));
    //                 // Do something with the collection value
    //             }
    //             _ => {}
    //         }
    //     }
    // }

    // generate implementation
    let gen = quote! {
        impl DbResource for #ident {
            const URL: &'static str = #url;
            const COLLECTION: &'static str = #collection;
            const TAG: &'static str = #tag;
        }
    };
    gen.into()
}
