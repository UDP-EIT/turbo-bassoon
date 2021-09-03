package api

import (
	db "cars/db"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Message string `json:"message"`
}

func NewStudent(ctx *gin.Context) {

	student := db.Student{}
	ctx.ShouldBindJSON(&student)
	db.DB.Create(&student)
	ctx.JSON(200, "Estudiante agregado")
}
