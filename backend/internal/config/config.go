package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Port            string
	JWTSecret       string
	JWTExpiryHours  int
	AllowedOrigin   string
	AdminUsername   string
	AdminPassword   string

	// MongoDB Config
	MongoURI        string
	MongoDBName     string

	// SMTP Config
	SMTPHost        string
	SMTPPort        int
	SMTPUser        string
	SMTPPass        string
	CompanyEmail    string
}

func Load() *Config {
	if err := godotenv.Load(".env"); err != nil {
		log.Println("Note: No .env file found or failed to load. Using system environment variables.")
	}

	port := getEnv("PORT", "8080")
	jwtSecret := getEnv("JWT_SECRET", "onfixlk_super_secret_jwt_key_2026_987654321")
	allowedOrigin := getEnv("ALLOWED_ORIGIN", "http://localhost:5173")
	adminUser := getEnv("ADMIN_USERNAME", "admin")
	adminPass := getEnv("ADMIN_PASSWORD", "adminpassword123")

	jwtExpiryHoursStr := getEnv("JWT_EXPIRY_HOURS", "24")
	jwtExpiryHours, err := strconv.Atoi(jwtExpiryHoursStr)
	if err != nil {
		jwtExpiryHours = 24
	}

	// Mongo config loading
	mongoURI := getEnv("MONGO_URI", "mongodb://localhost:27017")
	mongoDBName := getEnv("MONGO_DB_NAME", "onfixlk")

	// SMTP config loading
	smtpHost := getEnv("SMTP_HOST", "")
	smtpPortStr := getEnv("SMTP_PORT", "587")
	smtpPort, err := strconv.Atoi(smtpPortStr)
	if err != nil {
		smtpPort = 587
	}
	smtpUser := getEnv("SMTP_USER", "")
	smtpPass := getEnv("SMTP_PASS", "")
	companyEmail := getEnv("COMPANY_EMAIL", "info@onfix.lk")

	return &Config{
		Port:           port,
		JWTSecret:      jwtSecret,
		JWTExpiryHours: jwtExpiryHours,
		AllowedOrigin:  allowedOrigin,
		AdminUsername:  adminUser,
		AdminPassword:  adminPass,
		MongoURI:       mongoURI,
		MongoDBName:    mongoDBName,
		SMTPHost:       smtpHost,
		SMTPPort:       smtpPort,
		SMTPUser:       smtpUser,
		SMTPPass:       smtpPass,
		CompanyEmail:   companyEmail,
	}
}

func getEnv(key, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultVal
}
