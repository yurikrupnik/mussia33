extern crate proc_macro;
use proc_macro::TokenStream;
use quote::quote;
use syn::{DeriveInput, parse_macro_input};
use pluralizer::pluralize;

#[proc_macro_derive(MongoResource, attributes(collection))]
pub fn reflective_derive_macro(input: TokenStream) -> TokenStream {
    // parse
    let ast: DeriveInput = parse_macro_input!(input as DeriveInput);
    // generate
    impl_mongo_resource_macro(ast)
}

enum CollectionBehavior {
    Default,
    Pluralize,
    Singularize,
}
fn impl_mongo_resource_macro(ast: DeriveInput) -> TokenStream {
    // get struct identifier
    let ident = &ast.ident;
    let url = ident.to_string().to_lowercase();
    let collection = pluralize(url.as_str(), 2, false);

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
        impl MongoResource for #ident {
            const URL: &'static str = #url;
            const COLLECTION: &'static str = #collection;
        }
    };
    gen.into()
}

