use super::query_param_processing::QueryParamProcessing;
use mongodb::bson::{doc, Document};
use mongodb::options::FindOptions;
use std::error::Error;

// Generic function that works with any type that implements QueryParamProcessing
pub fn construct_find_options_and_filter<T: QueryParamProcessing>(
    mut query: T,
) -> Result<(Document, FindOptions), Box<dyn Error>> {
    // let pro = query.get_projection().unwrap();
    // dbg!(pro);
    let mut options = FindOptions::builder().build();

    if let Some(limit) = query.get_limit() {
        options.limit = Some(limit.parse::<i64>()?);
        query.clear_limit();
    }
    if let Some(projection) = query.get_projection() {
        let doc = if projection.contains(',') {
            projection.split(',').fold(doc! {}, |mut acc, item| {
                acc.insert(item.trim(), 1);
                acc
            })
        } else {
            doc! { projection: 1 }
        };
        options.projection = Some(doc);
        query.clear_projection();
    }
    // Convert the remaining query parameters into a MongoDB filter document
    let query_params_json = query.into_inner();
    let filter = serde_json::from_value::<Document>(query_params_json)?;

    Ok((filter, options))
}
