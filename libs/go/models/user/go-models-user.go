package go_models_user

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Email    string             `validate:"required,email,min=6,max=32" json:"email" bson:"email,omitempty"`
	Name     string             `validate:"required" json:"name" bson:"name"`
	Password string             `validate:"required" json:"password" bson:"password,omitempty"`
	TenantId string             `validate:"required" json:"tenantId" bson:"tenantId,omitempty"`
	Role     string             `validate:"required" json:"role" bson:"role,omitempty"`
	Provider string             `validate:"required" json:"provider" bson:"provider,omitempty"`
}
