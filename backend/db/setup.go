package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB
var databaseURL string

func init() {

	host := os.Getenv("DATABASE_HOST")
	port := os.Getenv("DATABASE_PORT")
	name := os.Getenv("DATABASE_NAME")
	user := os.Getenv("DATABASE_USER")
	password := os.Getenv("DATABASE_PASSWORD")

	databaseURL = fmt.Sprintf("host=%s port=%s user=%s dbname=%s password='%s' sslmode=disable",
		host, port, user, name, password)

}

func Connect() {
	fmt.Println("Connecting to database...")
	fmt.Println(databaseURL)
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
	if err != nil {
		log.Panicln(err)
	}
	DB = db
}

func Setup() {
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})

	// db, err := gorm.Open("sqlite3", "test.db")

	if err != nil {
		panic(err)
		// panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Student{})

}
