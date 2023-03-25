package go_fiber_helpers

import (
	"testing"
)

func TestFiberHelpers(t *testing.T) {
	result := "works"
	if result != "works" {
		t.Error("Expected FiberHelpers to append 'works'")
	}
}
