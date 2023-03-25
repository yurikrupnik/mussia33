package go_fiber_helpers

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	go_mongodb "mussia33/libs/go/mongodb"
)

// DefaultErrorHandler Default error handler
func DefaultErrorHandler(c *fiber.Ctx, err error) error {
	// Default 500 statuscode
	code := fiber.StatusInternalServerError
	if e, ok := err.(*fiber.Error); ok {
		// Override status code if fiber.Error type
		code = e.Code
	}
	// Set Content-Type: text/plain; charset=utf-8
	c.Set(fiber.HeaderContentType, fiber.MIMETextPlainCharsetUTF8)
	// Return statuscode with error message
	return c.Status(code).SendString(err.Error())
}

func CreateFakeGroup[T interface{}](api fiber.Router, name string, collection string) fiber.Router {
	router := api.Group(name)
	router.Post("/", createHandlerCreate[T](collection))
	router.Get("/", createHandlerList[T](collection))
	router.Get("/:id", createHandleGetById[T](collection))
	router.Delete("/:id", createHandleDeleteById[T](collection))
	router.Put("/:id", createHandleUpdate[T](collection))
	return router
}

func createHandlerCreate[T interface{}](collection string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var payload T
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		fmt.Println(">>>>>>payload", payload)
		//validate the request body
		if err := c.BodyParser(&payload); err != nil {
			return c.Status(http.StatusBadRequest).JSON(err.Error())
		}
		result, err := go_mongodb.Mg.Db.Collection(collection).InsertOne(ctx, payload)
		if err != nil {
			//return c.Status(http.StatusInternalServerError).JSON(UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		fmt.Println(">>>>>>payload", payload)
		fmt.Println("result", result)
		return c.Status(http.StatusCreated).JSON(result)
	}
}

func createHandlerList[T interface{}](collection string) fiber.Handler {
	return func(c *fiber.Ctx) error {

		//var usr T
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		//todo handle query
		//data := c.Request().URI().QueryString()
		query := bson.M{} // todo handle query
		//query := bson.M{} // todo handle query
		//fmt.Println(c.Query("email"))
		//fmt.Println(c.Query("*"))
		cursor, err := go_mongodb.Mg.Db.Collection(collection).Find(ctx, query)
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString(err.Error())
		}
		//defer cursor.Close(ctx)
		var response []T = make([]T, 0)

		for cursor.Next(ctx) {
			var item T
			err := cursor.Decode(&item)
			if err != nil {
				fmt.Println(err)
			}
			response = append(response, item)
		}
		return c.Status(http.StatusOK).JSON(response)
	}
}

func createHandleGetById[T interface{}](collection string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		id := c.Params("id")
		var response T
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(id)

		err := go_mongodb.Mg.Db.Collection(collection).FindOne(ctx, bson.M{"_id": objId}).Decode(&response)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(err.Error())
		}

		//return c.Status(http.StatusOK).JSON(UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": user}})
		return c.Status(fiber.StatusOK).JSON(response)
	}
}

func createHandleDeleteById[T interface{}](collection string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		id := c.Params("id")
		fmt.Println("id>>", id)
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(id)

		//result, err := userCollection.DeleteOne(ctx, bson.M{"id": objId})
		result, err := go_mongodb.Mg.Db.Collection(collection).DeleteOne(ctx, bson.M{"_id": objId})
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(err.Error())
		}

		if result.DeletedCount < 1 {
			return c.Status(http.StatusNotFound).JSON(
				&fiber.Map{"data": "Item with specified ID not found!"},
			)
		}

		return c.Status(http.StatusOK).JSON(
			&fiber.Map{"data": "Successfully deleted!"},
		)
	}
}

func createHandleUpdate[T interface{}](collection string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		id := c.Params("id")
		var payload T
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(id)
		fmt.Println(objId)
		if err := c.BodyParser(&payload); err != nil {
			return c.Status(http.StatusBadRequest).JSON(err.Error())
		}

		result, err := go_mongodb.Mg.Db.Collection(collection).UpdateOne(ctx, bson.M{"_id": objId}, bson.M{"$set": payload})

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(err.Error())
		}
		if result.MatchedCount < 1 {
			return c.Status(http.StatusNotFound).JSON(
				&fiber.Map{"data": "failed to update!"},
			)
		}
		return c.Status(http.StatusOK).JSON(
			&fiber.Map{"data": "Successfully updated!"},
		)
	}
}
