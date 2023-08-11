package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	go_fiber_helpers "mussia33/libs/go/fiber-helpers"
	go_generic_api "mussia33/libs/go/generic-api"
	go_models_user "mussia33/libs/go/models/user"
	go_shared "mussia33/libs/go/shared"
)

type Project struct {
	ID   primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name string             `json:"name" bson:"name,omitempty" validate:"required,min=3,max=36"`
}

var db = "mussia33"
var userCollection = "users"
var projectsCollection = "projects"

func updateById[T any](c *fiber.Ctx) error {
	return c.SendString("updated")
}

func main() {
	app := fiber.New(fiber.Config{
		ErrorHandler: go_fiber_helpers.DefaultErrorHandler,
	})

	// Add Prometheus default metrics to the default registry
	//app.Use(prometheus.NewMiddleware("my_app"))

	// Register custom metrics (if any)
	//registerCustomMetrics()

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/api/test", updateById[go_models_user.User])
	app.Get("/api/aa", updateById[go_models_user.User])
	app.Get("/api/health", updateById[go_models_user.User])
	apiGroup := app.Group("api")
	go_generic_api.New[go_models_user.User](apiGroup, db, userCollection)
	go_generic_api.New[Project](apiGroup, db, projectsCollection)

	app.Get("/dashboard", monitor.New())
	port := go_shared.Getenv("PORT", "8080")
	log.Println("port", port)
	host := go_shared.Getenv("HOST", "0.0.0.0")
	result := fmt.Sprintf("%s:%s", host, port)
	log.Panic(app.Listen(result))
}

//func registerCustomMetrics() {
// If you have custom metrics, you can register them here.
// For example:
// customMetric := prometheus.NewCounter(prometheus.CounterOpts{
// 	Name: "my_custom_metric",
// 	Help: "Description of my custom metric.",
// })
// prometheus.MustRegister(customMetric)
//}
