package api

import (
	db "cars/db"

	"github.com/gin-gonic/gin"
)

func GetAllStudents(ctx *gin.Context) {

	students := []db.Student{}
	db.DB.Find(&students)
	ctx.JSON(200, students)
}
