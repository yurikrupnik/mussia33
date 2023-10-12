pub use reflective_derive::Reflective;
pub use mongo_resource_derive::MongoResource;

pub trait Reflective {
    fn name(&self) -> &'static str;
    fn field_names(&self) -> Vec<&'static str>;
    // fn field_values(&self) -> Vec<String>;
}

pub trait MongoResource {
    const URL: &'static str;
    const COLLECTION: &'static str;
}
