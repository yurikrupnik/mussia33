// This file is generated by rust-protobuf 3.2.0. Do not edit
// .proto file is parsed by protoc --rust-out=...
// @generated

// https://github.com/rust-lang/rust-clippy/issues/702
#![allow(unknown_lints)]
#![allow(clippy::all)]

#![allow(unused_attributes)]
#![cfg_attr(rustfmt, rustfmt::skip)]

#![allow(box_pointers)]
#![allow(dead_code)]
#![allow(missing_docs)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(trivial_casts)]
#![allow(unused_results)]
#![allow(unused_mut)]

//! Generated file from `_proto/commons.proto`

/// Generated files are compatible only with the same version
/// of protobuf runtime.
const _PROTOBUF_VERSION_CHECK: () = ::protobuf::VERSION_3_2_0;

#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:commons.Id)
pub struct Id {
    // message fields
    // @@protoc_insertion_point(field:commons.Id.id)
    pub id: ::std::string::String,
    // special fields
    // @@protoc_insertion_point(special_field:commons.Id.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a Id {
    fn default() -> &'a Id {
        <Id as ::protobuf::Message>::default_instance()
    }
}

impl Id {
    pub fn new() -> Id {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(1);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "id",
            |m: &Id| { &m.id },
            |m: &mut Id| { &mut m.id },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<Id>(
            "Id",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for Id {
    const NAME: &'static str = "Id";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.id = is.read_string()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if !self.id.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.id);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if !self.id.is_empty() {
            os.write_string(1, &self.id)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> Id {
        Id::new()
    }

    fn clear(&mut self) {
        self.id.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static Id {
        static instance: Id = Id {
            id: ::std::string::String::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for Id {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("Id").unwrap()).clone()
    }
}

impl ::std::fmt::Display for Id {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Id {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:commons.Name)
pub struct Name {
    // message fields
    // @@protoc_insertion_point(field:commons.Name.name)
    pub name: ::std::string::String,
    // special fields
    // @@protoc_insertion_point(special_field:commons.Name.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a Name {
    fn default() -> &'a Name {
        <Name as ::protobuf::Message>::default_instance()
    }
}

impl Name {
    pub fn new() -> Name {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(1);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "name",
            |m: &Name| { &m.name },
            |m: &mut Name| { &mut m.name },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<Name>(
            "Name",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for Name {
    const NAME: &'static str = "Name";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.name = is.read_string()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if !self.name.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.name);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if !self.name.is_empty() {
            os.write_string(1, &self.name)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> Name {
        Name::new()
    }

    fn clear(&mut self) {
        self.name.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static Name {
        static instance: Name = Name {
            name: ::std::string::String::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for Name {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("Name").unwrap()).clone()
    }
}

impl ::std::fmt::Display for Name {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Name {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:commons.Query)
pub struct Query {
    // message fields
    // @@protoc_insertion_point(field:commons.Query.attributes)
    pub attributes: ::std::vec::Vec<::std::string::String>,
    // @@protoc_insertion_point(field:commons.Query.where)
    pub where_: ::std::string::String,
    // @@protoc_insertion_point(field:commons.Query.order)
    pub order: ::std::string::String,
    // @@protoc_insertion_point(field:commons.Query.offset)
    pub offset: i32,
    // @@protoc_insertion_point(field:commons.Query.limit)
    pub limit: i32,
    // special fields
    // @@protoc_insertion_point(special_field:commons.Query.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a Query {
    fn default() -> &'a Query {
        <Query as ::protobuf::Message>::default_instance()
    }
}

impl Query {
    pub fn new() -> Query {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(5);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_vec_simpler_accessor::<_, _>(
            "attributes",
            |m: &Query| { &m.attributes },
            |m: &mut Query| { &mut m.attributes },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "where",
            |m: &Query| { &m.where_ },
            |m: &mut Query| { &mut m.where_ },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "order",
            |m: &Query| { &m.order },
            |m: &mut Query| { &mut m.order },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "offset",
            |m: &Query| { &m.offset },
            |m: &mut Query| { &mut m.offset },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "limit",
            |m: &Query| { &m.limit },
            |m: &mut Query| { &mut m.limit },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<Query>(
            "Query",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for Query {
    const NAME: &'static str = "Query";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.attributes.push(is.read_string()?);
                },
                18 => {
                    self.where_ = is.read_string()?;
                },
                26 => {
                    self.order = is.read_string()?;
                },
                32 => {
                    self.offset = is.read_int32()?;
                },
                40 => {
                    self.limit = is.read_int32()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        for value in &self.attributes {
            my_size += ::protobuf::rt::string_size(1, &value);
        };
        if !self.where_.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.where_);
        }
        if !self.order.is_empty() {
            my_size += ::protobuf::rt::string_size(3, &self.order);
        }
        if self.offset != 0 {
            my_size += ::protobuf::rt::int32_size(4, self.offset);
        }
        if self.limit != 0 {
            my_size += ::protobuf::rt::int32_size(5, self.limit);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        for v in &self.attributes {
            os.write_string(1, &v)?;
        };
        if !self.where_.is_empty() {
            os.write_string(2, &self.where_)?;
        }
        if !self.order.is_empty() {
            os.write_string(3, &self.order)?;
        }
        if self.offset != 0 {
            os.write_int32(4, self.offset)?;
        }
        if self.limit != 0 {
            os.write_int32(5, self.limit)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> Query {
        Query::new()
    }

    fn clear(&mut self) {
        self.attributes.clear();
        self.where_.clear();
        self.order.clear();
        self.offset = 0;
        self.limit = 0;
        self.special_fields.clear();
    }

    fn default_instance() -> &'static Query {
        static instance: Query = Query {
            attributes: ::std::vec::Vec::new(),
            where_: ::std::string::String::new(),
            order: ::std::string::String::new(),
            offset: 0,
            limit: 0,
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for Query {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("Query").unwrap()).clone()
    }
}

impl ::std::fmt::Display for Query {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Query {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:commons.Count)
pub struct Count {
    // message fields
    // @@protoc_insertion_point(field:commons.Count.count)
    pub count: i32,
    // special fields
    // @@protoc_insertion_point(special_field:commons.Count.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a Count {
    fn default() -> &'a Count {
        <Count as ::protobuf::Message>::default_instance()
    }
}

impl Count {
    pub fn new() -> Count {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(1);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "count",
            |m: &Count| { &m.count },
            |m: &mut Count| { &mut m.count },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<Count>(
            "Count",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for Count {
    const NAME: &'static str = "Count";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                8 => {
                    self.count = is.read_int32()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if self.count != 0 {
            my_size += ::protobuf::rt::int32_size(1, self.count);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if self.count != 0 {
            os.write_int32(1, self.count)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> Count {
        Count::new()
    }

    fn clear(&mut self) {
        self.count = 0;
        self.special_fields.clear();
    }

    fn default_instance() -> &'static Count {
        static instance: Count = Count {
            count: 0,
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for Count {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("Count").unwrap()).clone()
    }
}

impl ::std::fmt::Display for Count {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Count {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

static file_descriptor_proto_data: &'static [u8] = b"\
    \n\x14_proto/commons.proto\x12\x07commons\"\x14\n\x02Id\x12\x0e\n\x02id\
    \x18\x01\x20\x01(\tR\x02id\"\x1a\n\x04Name\x12\x12\n\x04name\x18\x01\x20\
    \x01(\tR\x04name\"\x81\x01\n\x05Query\x12\x1e\n\nattributes\x18\x01\x20\
    \x03(\tR\nattributes\x12\x14\n\x05where\x18\x02\x20\x01(\tR\x05where\x12\
    \x14\n\x05order\x18\x03\x20\x01(\tR\x05order\x12\x16\n\x06offset\x18\x04\
    \x20\x01(\x05R\x06offset\x12\x14\n\x05limit\x18\x05\x20\x01(\x05R\x05lim\
    it\"\x1d\n\x05Count\x12\x14\n\x05count\x18\x01\x20\x01(\x05R\x05countB\
    \x0eZ\x0cgrpc/commonsJ\xd7\x04\n\x06\x12\x04\0\0\x18\x01\n\x08\n\x01\x0c\
    \x12\x03\0\0\x12\n\x08\n\x01\x02\x12\x03\x02\0\x10\n\x08\n\x01\x08\x12\
    \x03\x04\0#\n\t\n\x02\x08\x0b\x12\x03\x04\0#\n\n\n\x02\x04\0\x12\x04\x06\
    \0\x08\x01\n\n\n\x03\x04\0\x01\x12\x03\x06\x08\n\n\x0b\n\x04\x04\0\x02\0\
    \x12\x03\x07\x02\x10\n\x0c\n\x05\x04\0\x02\0\x05\x12\x03\x07\x02\x08\n\
    \x0c\n\x05\x04\0\x02\0\x01\x12\x03\x07\t\x0b\n\x0c\n\x05\x04\0\x02\0\x03\
    \x12\x03\x07\x0e\x0f\n\n\n\x02\x04\x01\x12\x04\n\0\x0c\x01\n\n\n\x03\x04\
    \x01\x01\x12\x03\n\x08\x0c\n\x0b\n\x04\x04\x01\x02\0\x12\x03\x0b\x02\x12\
    \n\x0c\n\x05\x04\x01\x02\0\x05\x12\x03\x0b\x02\x08\n\x0c\n\x05\x04\x01\
    \x02\0\x01\x12\x03\x0b\t\r\n\x0c\n\x05\x04\x01\x02\0\x03\x12\x03\x0b\x10\
    \x11\n\n\n\x02\x04\x02\x12\x04\x0e\0\x14\x01\n\n\n\x03\x04\x02\x01\x12\
    \x03\x0e\x08\r\n\x0b\n\x04\x04\x02\x02\0\x12\x03\x0f\x02!\n\x0c\n\x05\
    \x04\x02\x02\0\x04\x12\x03\x0f\x02\n\n\x0c\n\x05\x04\x02\x02\0\x05\x12\
    \x03\x0f\x0b\x11\n\x0c\n\x05\x04\x02\x02\0\x01\x12\x03\x0f\x12\x1c\n\x0c\
    \n\x05\x04\x02\x02\0\x03\x12\x03\x0f\x1f\x20\n\x0b\n\x04\x04\x02\x02\x01\
    \x12\x03\x10\x02\x13\n\x0c\n\x05\x04\x02\x02\x01\x05\x12\x03\x10\x02\x08\
    \n\x0c\n\x05\x04\x02\x02\x01\x01\x12\x03\x10\t\x0e\n\x0c\n\x05\x04\x02\
    \x02\x01\x03\x12\x03\x10\x11\x12\n\x0b\n\x04\x04\x02\x02\x02\x12\x03\x11\
    \x02\x13\n\x0c\n\x05\x04\x02\x02\x02\x05\x12\x03\x11\x02\x08\n\x0c\n\x05\
    \x04\x02\x02\x02\x01\x12\x03\x11\t\x0e\n\x0c\n\x05\x04\x02\x02\x02\x03\
    \x12\x03\x11\x11\x12\n\x0b\n\x04\x04\x02\x02\x03\x12\x03\x12\x02\x13\n\
    \x0c\n\x05\x04\x02\x02\x03\x05\x12\x03\x12\x02\x07\n\x0c\n\x05\x04\x02\
    \x02\x03\x01\x12\x03\x12\x08\x0e\n\x0c\n\x05\x04\x02\x02\x03\x03\x12\x03\
    \x12\x11\x12\n\x0b\n\x04\x04\x02\x02\x04\x12\x03\x13\x02\x12\n\x0c\n\x05\
    \x04\x02\x02\x04\x05\x12\x03\x13\x02\x07\n\x0c\n\x05\x04\x02\x02\x04\x01\
    \x12\x03\x13\x08\r\n\x0c\n\x05\x04\x02\x02\x04\x03\x12\x03\x13\x10\x11\n\
    \n\n\x02\x04\x03\x12\x04\x16\0\x18\x01\n\n\n\x03\x04\x03\x01\x12\x03\x16\
    \x08\r\n\x0b\n\x04\x04\x03\x02\0\x12\x03\x17\x02\x12\n\x0c\n\x05\x04\x03\
    \x02\0\x05\x12\x03\x17\x02\x07\n\x0c\n\x05\x04\x03\x02\0\x01\x12\x03\x17\
    \x08\r\n\x0c\n\x05\x04\x03\x02\0\x03\x12\x03\x17\x10\x11b\x06proto3\
";

/// `FileDescriptorProto` object which was a source for this generated file
fn file_descriptor_proto() -> &'static ::protobuf::descriptor::FileDescriptorProto {
    static file_descriptor_proto_lazy: ::protobuf::rt::Lazy<::protobuf::descriptor::FileDescriptorProto> = ::protobuf::rt::Lazy::new();
    file_descriptor_proto_lazy.get(|| {
        ::protobuf::Message::parse_from_bytes(file_descriptor_proto_data).unwrap()
    })
}

/// `FileDescriptor` object which allows dynamic access to files
pub fn file_descriptor() -> &'static ::protobuf::reflect::FileDescriptor {
    static generated_file_descriptor_lazy: ::protobuf::rt::Lazy<::protobuf::reflect::GeneratedFileDescriptor> = ::protobuf::rt::Lazy::new();
    static file_descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::FileDescriptor> = ::protobuf::rt::Lazy::new();
    file_descriptor.get(|| {
        let generated_file_descriptor = generated_file_descriptor_lazy.get(|| {
            let mut deps = ::std::vec::Vec::with_capacity(0);
            let mut messages = ::std::vec::Vec::with_capacity(4);
            messages.push(Id::generated_message_descriptor_data());
            messages.push(Name::generated_message_descriptor_data());
            messages.push(Query::generated_message_descriptor_data());
            messages.push(Count::generated_message_descriptor_data());
            let mut enums = ::std::vec::Vec::with_capacity(0);
            ::protobuf::reflect::GeneratedFileDescriptor::new_generated(
                file_descriptor_proto(),
                deps,
                messages,
                enums,
            )
        });
        ::protobuf::reflect::FileDescriptor::new_generated_2(generated_file_descriptor)
    })
}
