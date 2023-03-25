package go_shared

import (
	"os"
	"testing"
)

func TestGetenv(t *testing.T) {
	result := Getenv("works", "default")
	if result != "default" {
		t.Error("Expected Myutils to append 'works'")
	}

	test := "test"
	er := os.Setenv(test, test)
	if er != nil {
		t.Error("Failed to set env.")
	}
	result1 := Getenv(test, "default")
	if result1 != test {
		t.Error("Expected Myutils to append 'works'")
	}

	err := os.Unsetenv("test")
	if err != nil {
		t.Error("Expected to unset test env var")
	}
}
