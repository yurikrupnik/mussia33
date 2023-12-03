package stam

//import (
//	cloudrun "github.com/upbound/provider-gcp/apis/cloudrun/v1beta1"
//)
//message Server {
//  int32 port = 1 [(cue.val) = ">5000 & <10_000"];
//}

//message Server {
//  int32 port = 1 [(validate.rules).int32 = { gte: 5000, lte: 10000 }];
//}

//type Sum struct {
//    A int `cue:"c-b" json:"a,omitempty"`
//    B int `cue:"c-a" json:"b,omitempty"`
//    C int `cue:"a+b" json:"c,omitempty"`
//}

Typ: {
	name: string
	names: [...string]
}


// Definitions.

// Info describes...
Info: {
    // Name of the adapter.
    name: string

    // Templates.
    templates?: [...string]

    // Max is the limit.
    max?: uint & <100
}

//info
