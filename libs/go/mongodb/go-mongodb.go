package go_mongodb

import (
	"context"
	"fmt"
	go_shared "mussia33/libs/go/shared"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// todo remove!!!!
var mongoUrl string = "mongodb://localhost:27017"

// todo add back for env vars
// var mongoUrl = go_myutils.Getenv("MONGO_URI", "mongodb://localhost/mussia12")
var dbName = go_shared.Getenv("DB_NAME", "test")

// MongoInstance contains the Mongo client and database objects
type MongoInstance struct {
	Client *mongo.Client
	Db     *mongo.Database
}

var Mg MongoInstance

func NewDB() MongoInstance {
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoUrl))
	if err != nil {
		fmt.Println("error connecting to mongo:", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	db := client.Database(dbName)
	return MongoInstance{
		Client: client,
		Db:     db,
	}
}

// Connect configures the MongoDB client and initializes the database connection.
// Source: https://www.mongodb.com/blog/post/quick-start-golang--mongodb--starting-and-setup
func Connect() error {
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoUrl))

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	db := client.Database(dbName)

	if err != nil {
		return err
	}

	Mg = MongoInstance{
		Client: client,
		Db:     db,
	}

	return nil
}
