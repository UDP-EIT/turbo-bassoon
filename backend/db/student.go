package db

import (
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	ID       int
	Name     string `json:"name"`
	LastName string `json:"last_name"`
	Section  string `json:"section"`
}
