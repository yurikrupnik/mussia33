package go_generic_api

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	go_shared "mussia33/libs/go/shared"
)

type mongoStore[T any] struct {
	Collection *mongo.Collection
}

func newMongoStore[T any](db string, url string) (UserSvc[T], error) {
	uri := go_shared.Getenv("MONGO_URI", "mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	con := client.Database(db).Collection(url)
	if err != nil {
		log.Println("error connecting mongo")
		return nil, err
	}
	return mongoStore[T]{Collection: con}, nil
}

func (ms mongoStore[T]) get(id primitive.ObjectID) (*T, error) {
	filter := bson.M{"_id": id}
	var a T
	err := ms.Collection.FindOne(context.TODO(), filter).Decode(&a)
	if err != nil {
		return nil, err
	}
	return &a, nil
}

func (ms mongoStore[T]) list(u *T) ([]*T, error) {
	log.Println("u", u)
	filter := bson.M{}
	log.Println("filter", filter)
	data := []*T{}
	cursor, err := ms.Collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	if err := cursor.All(context.TODO(), &data); err != nil {
		return nil, err
	}
	return data, nil
}

func (ms mongoStore[T]) delete(id primitive.ObjectID) error {
	filter := bson.M{"_id": id}
	_, err := ms.Collection.DeleteOne(context.TODO(), filter)
	return err
}

func (ms mongoStore[T]) create(user *T) (*mongo.InsertOneResult, error) {
	result, err := ms.Collection.InsertOne(context.TODO(), user)
	return result, err
}

func (ms mongoStore[T]) update(id primitive.ObjectID, user *T) error {
	//update := bson.M{"name": user.Name, "email": user.Email, "role": user.Role}
	//fmt.Println(update)
	_, err := ms.Collection.UpdateOne(context.TODO(), bson.M{"_id": id}, bson.M{"$set": user})
	//log.Println("UpsertedID", result.UpsertedID)
	//_, err := col.UpdateOne(context.TODO(), user)
	return err
}
