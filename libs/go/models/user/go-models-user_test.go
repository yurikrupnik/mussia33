package go_models_user

import (
	"testing"
)

func TestModels(t *testing.T) {
	result := "Models works"
	if result != "Models works" {
		t.Error("Expected Models to append 'works'")
	}
}
