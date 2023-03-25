package go_mongodb

import (
	"testing"
)

func TestMongodb(t *testing.T) {
	result := "Mongodb works"
	if result != "Mongodb works" {
		t.Error("Expected Mongodb to append 'works'")
	}
}
