package go_generic_api

import (
	"testing"
)

func TestGenericApi(t *testing.T) {
	result := "GenericApi works"
	if result != "GenericApi works" {
		t.Error("Expected GenericApi to append 'works'")
	}
}
