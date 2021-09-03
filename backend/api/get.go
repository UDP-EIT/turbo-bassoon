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
func GetStudentsByName(ctx *gin.Context) {
	name := ctx.Request.URL.Query().Get("name")
	student := db.Student{}
	db.DB.Where("name = ?", name).Find(&student)
	ctx.JSON(200, student)
}

func GetAllStudentsByName(ctx *gin.Context) {
	name := ctx.Request.URL.Query().Get("name")
	students := []db.Student{}
	db.DB.Where("name like ?", "%"+name+"%").Or("last_name like ?", "%"+name+"%").Find(&students)
	ctx.JSON(200, students)
}
