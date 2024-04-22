extern crate proc_macro;
use proc_macro::TokenStream;
use quote::quote;
use syn::{Data, DeriveInput, Ident};

#[proc_macro_derive(Reflective)]
pub fn reflective_derive_macro(input: TokenStream) -> TokenStream {
    // parse
    let ast: DeriveInput = syn::parse(input).unwrap();
    // generate
    impl_reflective_macro(ast)
}

fn impl_reflective_macro(ast: DeriveInput) -> TokenStream {
    // get struct identifier
    let ident = &ast.ident;
    let ident_str = ident.to_string();

    // get field identifier
    let _field_idents_types = match &ast.data {
        Data::Struct(data_struct) => {
            data_struct
                .fields
                .iter()
                .map(|field| {
                    if let Some(ident) = &field.ident {
                        let ty = &field.ty;
                        quote! {
                            #ident: #ty
                        }
                    } else {
                        // Handle unnamed fields (tuple structs)
                        panic!("Unnamed fields are not supported");
                    }
                })
                .collect::<Vec<_>>()
        }
        Data::Enum(_) => panic!("Only structs are supported"),
        Data::Union(_) => panic!("Only structs are supported"),
    };
    let field_idents = match ast.data {
        Data::Struct(data_struct) => data_struct
            .fields
            .into_iter()
            .filter_map(|f| f.ident)
            .collect::<Vec<Ident>>(),
        Data::Enum(_) => panic!("Only structs are supported"),
        Data::Union(_) => panic!("Only structs are supported"),
    };
    let field_idents_str = field_idents
        .iter()
        .map(|f| f.to_string())
        .collect::<Vec<String>>();

    // Here we assume that all fields implement the `ToString` trait
    let field_access = field_idents.iter().map(|ident| {
        quote! {
            self.#ident.to_string()
            // self.#ident.
        }
    });

    // generate implementation
    let gen = quote! {
        impl Reflective for #ident {
            // type FieldValues = (#(#field_idents_types,)*);

            fn name() -> &'static str {
                // stringify!(#ident)
                #ident_str
            }
            fn field_names() -> Vec<&'static str> {
                vec![#(#field_idents_str),*]
            }

            fn field_values(&self) -> Vec<String> {
              vec![#(#field_access),*]
            }
        }
    };
    gen.into()
}
