// use mongodb::bson::oid::ObjectId;
// use serde::Serializer;

pub fn serialize_object_id<T>(
  oid: &Option<mongodb::bson::oid::ObjectId>,
  s: T
) -> Result<T::Ok, T::Error>
where
  T: serde::Serializer,
{
    match oid.as_ref().map(|x| x.to_hex()) {
        Some(v) => s.serialize_str(&v),
        None => s.serialize_none(),
    }
}
