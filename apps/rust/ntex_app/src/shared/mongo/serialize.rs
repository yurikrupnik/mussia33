use mongodb::bson::oid::ObjectId;
use serde::de::{SeqAccess, Visitor};
use serde::{de, Serialize};
use std::fmt;

pub fn serialize_object_id<T>(oid: &ObjectId, s: T) -> Result<T::Ok, T::Error>
where
    T: serde::Serializer,
{
    s.serialize_str(&oid.to_hex())
}

pub fn serialize_option_object_id<T>(oid: &Option<ObjectId>, s: T) -> Result<T::Ok, T::Error>
where
    T: serde::Serializer,
{
    match oid.as_ref().map(|x| x.to_hex()) {
        Some(v) => s.serialize_str(&v),
        None => s.serialize_none(),
    }
}

pub fn serialize_items<S>(items: &[ObjectId], serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    let ids: Vec<String> = items.iter().map(|id| id.to_hex()).collect();
    ids.serialize(serializer)
}

// Custom deserialization for users field
pub fn deserialize_items<'de, D>(deserializer: D) -> Result<Vec<ObjectId>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    struct ObjectIdVecVisitor;

    impl<'de> Visitor<'de> for ObjectIdVecVisitor {
        type Value = Vec<ObjectId>;

        fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
            formatter.write_str("a sequence of ObjectIds")
        }

        fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
        where
            A: SeqAccess<'de>,
        {
            let mut ids = Vec::new();
            while let Some(id_str) = seq.next_element::<String>()? {
                ids.push(ObjectId::parse_str(&id_str).map_err(de::Error::custom)?);
            }
            Ok(ids)
        }
    }

    deserializer.deserialize_seq(ObjectIdVecVisitor)
}
