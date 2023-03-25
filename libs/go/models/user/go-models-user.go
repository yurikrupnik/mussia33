package go_models_user

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string             `validate:"required,email,min=6,max=32" json:"email" bson:"email,omitempty"`
	Username  string             `validate:"required" json:"username" bson:"username"`
	FirstName string             `validate:"required" json:"firstName" bson:"firstName,omitempty"`
	LastName  string             `validate:"required" json:"lastName" bson:"lastName,omitempty"`
}
