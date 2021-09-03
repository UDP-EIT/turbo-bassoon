package api

import (
	db "cars/db"

	"github.com/gin-gonic/gin"
)

func DeleteStudent(c *gin.Context) {
	id := c.Param("id")
	db.DB.Delete(&db.Student{}, id)
	c.JSON(200, gin.H{
		"message": "Student deleted",
	})
}
