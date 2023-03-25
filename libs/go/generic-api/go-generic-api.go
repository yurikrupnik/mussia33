package go_generic_api

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
)

type UserSvc[T any] interface {
	get(id primitive.ObjectID) (*T, error)
	list(item *T) ([]*T, error)
	create(item *T) (*mongo.InsertOneResult, error)
	delete(id primitive.ObjectID) error
	update(id primitive.ObjectID, item *T) error
}

func New[T any](r fiber.Router, db string, url string) {
	s, err := newMongoStore[T](db, url)
	if err != nil {
		//return errors.Wrap(err, "unable to connect to db")
	}
	handlers := newHandler[T](s)
	Routes[T](r, url, handlers)
	log.Print("all good")
}
