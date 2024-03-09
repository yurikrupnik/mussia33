// Trait to be implemented by any QueryParams structure
pub trait QueryParamProcessing {
    fn get_limit(&self) -> Option<String>;
    fn clear_limit(&mut self);
    fn get_projection(&self) -> Option<String>;
    fn clear_projection(&mut self);
    fn into_inner(self) -> serde_json::Value;
}
