package go_generic_api

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"log"
)

type IError struct {
	Field string `json:"field"`
	Tag   string `json:"tag"`
	Value string `json:"value"`
}

var Validator = validator.New()

func createAndUpdateValidation[T any](partial bool) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var errors []*IError
		body := new(T)
		c.BodyParser(&body)
		if partial {
			err := Validator.StructPartial(body)
			if err != nil {
				for _, err := range err.(validator.ValidationErrors) {
					var el IError
					el.Field = err.Field()
					el.Tag = err.Tag()
					el.Value = err.Param()
					log.Println(err)
					errors = append(errors, &el)
				}
				return c.Status(fiber.StatusBadRequest).JSON(errors)
			}
		} else {
			err := Validator.Struct(body)
			if err != nil {
				for _, err := range err.(validator.ValidationErrors) {
					var el IError
					el.Field = err.Field()
					el.Tag = err.Tag()
					el.Value = err.Param()
					log.Println(err)
					errors = append(errors, &el)
				}
				return c.Status(fiber.StatusBadRequest).JSON(errors)
			}
		}
		return c.Next()
	}
}

func Routes[T any](api fiber.Router, name string, h *Handler[T]) {
	router := api.Group(name)
	router.Post("/", createAndUpdateValidation[T](false), h.create)
	router.Get("", h.list)
	router.Get("/:id", h.getById)
	router.Delete("/:id", h.deleteById)
	router.Put("/:id", createAndUpdateValidation[T](true), h.updateById)
}
