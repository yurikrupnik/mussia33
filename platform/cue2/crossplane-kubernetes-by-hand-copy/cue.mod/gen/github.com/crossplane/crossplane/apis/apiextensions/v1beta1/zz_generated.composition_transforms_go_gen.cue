// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go github.com/crossplane/crossplane/apis/apiextensions/v1beta1

package v1beta1

import extv1 "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1"

// TransformType is type of the transform function to be chosen.
#TransformType: string // #enumTransformType

#enumTransformType:
	#TransformTypeMap |
	#TransformTypeMatch |
	#TransformTypeMath |
	#TransformTypeString |
	#TransformTypeConvert

#ErrFmtConvertFormatPairNotSupported: "conversion from %s to %s is not supported with format %s"
#TransformTypeMap:                    #TransformType & "map"
#TransformTypeMatch:                  #TransformType & "match"
#TransformTypeMath:                   #TransformType & "math"
#TransformTypeString:                 #TransformType & "string"
#TransformTypeConvert:                #TransformType & "convert"

// Transform is a unit of process whose input is transformed into an output with
// the supplied configuration.
#Transform: {
	// Type of the transform to be run.
	// +kubebuilder:validation:Enum=map;match;math;string;convert
	type: #TransformType @go(Type)

	// Math is used to transform the input via mathematical operations such as
	// multiplication.
	// +optional
	math?: null | #MathTransform @go(Math,*MathTransform)

	// Map uses the input as a key in the given map and returns the value.
	// +optional
	map?: null | #MapTransform @go(Map,*MapTransform)

	// Match is a more complex version of Map that matches a list of patterns.
	// +optional
	match?: null | #MatchTransform @go(Match,*MatchTransform)

	// String is used to transform the input into a string or a different kind
	// of string. Note that the input does not necessarily need to be a string.
	// +optional
	string?: null | #StringTransform @go(String,*StringTransform)

	// Convert is used to cast the input into the given output type.
	// +optional
	convert?: null | #ConvertTransform @go(Convert,*ConvertTransform)
}

// MathTransformType conducts mathematical operations.
#MathTransformType: string // #enumMathTransformType

#enumMathTransformType:
	#MathTransformTypeMultiply |
	#MathTransformTypeClampMin |
	#MathTransformTypeClampMax

#MathTransformTypeMultiply: #MathTransformType & "Multiply"
#MathTransformTypeClampMin: #MathTransformType & "ClampMin"
#MathTransformTypeClampMax: #MathTransformType & "ClampMax"

// MathTransform conducts mathematical operations on the input with the given
// configuration in its properties.
#MathTransform: {
	// Type of the math transform to be run.
	// +optional
	// +kubebuilder:validation:Enum=Multiply;ClampMin;ClampMax
	// +kubebuilder:default=Multiply
	type?: #MathTransformType @go(Type)

	// Multiply the value.
	// +optional
	multiply?: null | int64 @go(Multiply,*int64)

	// ClampMin makes sure that the value is not smaller than the given value.
	// +optional
	clampMin?: null | int64 @go(ClampMin,*int64)

	// ClampMax makes sure that the value is not bigger than the given value.
	// +optional
	clampMax?: null | int64 @go(ClampMax,*int64)
}

// MapTransform returns a value for the input from the given map.
#MapTransform: _

// MatchFallbackTo defines how a match operation will fallback.
#MatchFallbackTo: string // #enumMatchFallbackTo

#enumMatchFallbackTo:
	#MatchFallbackToTypeValue |
	#MatchFallbackToTypeInput

#MatchFallbackToTypeValue: #MatchFallbackTo & "Value"
#MatchFallbackToTypeInput: #MatchFallbackTo & "Input"

// MatchTransform is a more complex version of a map transform that matches a
// list of patterns.
#MatchTransform: {
	// The patterns that should be tested against the input string.
	// Patterns are tested in order. The value of the first match is used as
	// result of this transform.
	patterns?: [...#MatchTransformPattern] @go(Patterns,[]MatchTransformPattern)

	// The fallback value that should be returned by the transform if now pattern
	// matches.
	fallbackValue?: extv1.#JSON @go(FallbackValue)

	// Determines to what value the transform should fallback if no pattern matches.
	// +optional
	// +kubebuilder:validation:Enum=Value;Input
	// +kubebuilder:default=Value
	fallbackTo?: #MatchFallbackTo @go(FallbackTo)
}

// MatchTransformPatternType defines the type of a MatchTransformPattern.
#MatchTransformPatternType: string // #enumMatchTransformPatternType

#enumMatchTransformPatternType:
	#MatchTransformPatternTypeLiteral |
	#MatchTransformPatternTypeRegexp

#MatchTransformPatternTypeLiteral: #MatchTransformPatternType & "literal"
#MatchTransformPatternTypeRegexp:  #MatchTransformPatternType & "regexp"

// MatchTransformPattern is a transform that returns the value that matches a
// pattern.
#MatchTransformPattern: {
	// Type specifies how the pattern matches the input.
	//
	// * `literal` - the pattern value has to exactly match (case sensitive) the
	// input string. This is the default.
	//
	// * `regexp` - the pattern treated as a regular expression against
	// which the input string is tested. Crossplane will throw an error if the
	// key is not a valid regexp.
	//
	// +kubebuilder:validation:Enum=literal;regexp
	// +kubebuilder:default=literal
	type: #MatchTransformPatternType @go(Type)

	// Literal exactly matches the input string (case sensitive).
	// Is required if `type` is `literal`.
	literal?: null | string @go(Literal,*string)

	// Regexp to match against the input string.
	// Is required if `type` is `regexp`.
	regexp?: null | string @go(Regexp,*string)

	// The value that is used as result of the transform if the pattern matches.
	result: extv1.#JSON @go(Result)
}

// StringTransformType transforms a string.
#StringTransformType: string // #enumStringTransformType

#enumStringTransformType:
	#StringTransformTypeFormat |
	#StringTransformTypeConvert |
	#StringTransformTypeTrimPrefix |
	#StringTransformTypeTrimSuffix |
	#StringTransformTypeRegexp

#StringTransformTypeFormat:     #StringTransformType & "Format"
#StringTransformTypeConvert:    #StringTransformType & "Convert"
#StringTransformTypeTrimPrefix: #StringTransformType & "TrimPrefix"
#StringTransformTypeTrimSuffix: #StringTransformType & "TrimSuffix"
#StringTransformTypeRegexp:     #StringTransformType & "Regexp"

// StringConversionType converts a string.
#StringConversionType: string // #enumStringConversionType

#enumStringConversionType:
	#StringConversionTypeToUpper |
	#StringConversionTypeToLower |
	#StringConversionTypeToJSON |
	#StringConversionTypeToBase64 |
	#StringConversionTypeFromBase64 |
	#StringConversionTypeToSHA1 |
	#StringConversionTypeToSHA256 |
	#StringConversionTypeToSHA512 |
	#StringConversionTypeToAdler32

#StringConversionTypeToUpper:    #StringConversionType & "ToUpper"
#StringConversionTypeToLower:    #StringConversionType & "ToLower"
#StringConversionTypeToJSON:     #StringConversionType & "ToJson"
#StringConversionTypeToBase64:   #StringConversionType & "ToBase64"
#StringConversionTypeFromBase64: #StringConversionType & "FromBase64"
#StringConversionTypeToSHA1:     #StringConversionType & "ToSha1"
#StringConversionTypeToSHA256:   #StringConversionType & "ToSha256"
#StringConversionTypeToSHA512:   #StringConversionType & "ToSha512"
#StringConversionTypeToAdler32:  #StringConversionType & "ToAdler32"

// A StringTransform returns a string given the supplied input.
#StringTransform: {
	// Type of the string transform to be run.
	// +optional
	// +kubebuilder:validation:Enum=Format;Convert;TrimPrefix;TrimSuffix;Regexp
	// +kubebuilder:default=Format
	type?: #StringTransformType @go(Type)

	// Format the input using a Go format string. See
	// https://golang.org/pkg/fmt/ for details.
	// +optional
	fmt?: null | string @go(Format,*string)

	// Optional conversion method to be specified.
	// `ToUpper` and `ToLower` change the letter case of the input string.
	// `ToBase64` and `FromBase64` perform a base64 conversion based on the input string.
	// `ToJson` converts any input value into its raw JSON representation.
	// `ToSha1`, `ToSha256` and `ToSha512` generate a hash value based on the input
	// converted to JSON.
	// +optional
	// +kubebuilder:validation:Enum=ToUpper;ToLower;ToBase64;FromBase64;ToJson;ToSha1;ToSha256;ToSha512
	convert?: null | #StringConversionType @go(Convert,*StringConversionType)

	// Trim the prefix or suffix from the input
	// +optional
	trim?: null | string @go(Trim,*string)

	// Extract a match from the input using a regular expression.
	// +optional
	regexp?: null | #StringTransformRegexp @go(Regexp,*StringTransformRegexp)
}

// A StringTransformRegexp extracts a match from the input using a regular
// expression.
#StringTransformRegexp: {
	// Match string. May optionally include submatches, aka capture groups.
	// See https://pkg.go.dev/regexp/ for details.
	match: string @go(Match)

	// Group number to match. 0 (the default) matches the entire expression.
	// +optional
	group?: null | int @go(Group,*int)
}

// TransformIOType defines the type of a ConvertTransform.
#TransformIOType: string // #enumTransformIOType

#enumTransformIOType:
	#TransformIOTypeString |
	#TransformIOTypeBool |
	#TransformIOTypeInt |
	#TransformIOTypeInt64 |
	#TransformIOTypeFloat64 |
	#TransformIOTypeObject |
	#TransformIOTypeArray

#TransformIOTypeString:  #TransformIOType & "string"
#TransformIOTypeBool:    #TransformIOType & "bool"
#TransformIOTypeInt:     #TransformIOType & "int"
#TransformIOTypeInt64:   #TransformIOType & "int64"
#TransformIOTypeFloat64: #TransformIOType & "float64"
#TransformIOTypeObject:  #TransformIOType & "object"
#TransformIOTypeArray:   #TransformIOType & "array"

// ConvertTransformFormat defines the expected format of an input value of a
// conversion transform.
#ConvertTransformFormat: string // #enumConvertTransformFormat

#enumConvertTransformFormat:
	#ConvertTransformFormatNone |
	#ConvertTransformFormatQuantity |
	#ConvertTransformFormatJSON

#ConvertTransformFormatNone:     #ConvertTransformFormat & "none"
#ConvertTransformFormatQuantity: #ConvertTransformFormat & "quantity"
#ConvertTransformFormatJSON:     #ConvertTransformFormat & "json"

// A ConvertTransform converts the input into a new object whose type is supplied.
#ConvertTransform: {
	// ToType is the type of the output of this transform.
	// +kubebuilder:validation:Enum=string;int;int64;bool;float64;object;array
	toType: #TransformIOType @go(ToType)

	// The expected input format.
	//
	// * `quantity` - parses the input as a K8s [`resource.Quantity`](https://pkg.go.dev/k8s.io/apimachinery/pkg/api/resource#Quantity).
	// Only used during `string -> float64` conversions.
	// * `json` - parses the input as a JSON string.
	// Only used during `string -> object` or `string -> list` conversions.
	//
	// If this property is null, the default conversion is applied.
	//
	// +kubebuilder:validation:Enum=none;quantity;json
	// +kubebuilder:validation:Default=none
	format?: null | #ConvertTransformFormat @go(Format,*ConvertTransformFormat)
}