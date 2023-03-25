package go_fiber_helpers

import (
	"testing"
)

func TestFiberHelpers(t *testing.T) {
	result := FiberHelpers("works")
	if result != "FiberHelpers works" {
		t.Error("Expected FiberHelpers to append 'works'")
	}
}
