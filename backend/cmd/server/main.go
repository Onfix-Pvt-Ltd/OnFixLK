package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"backend/internal/config"
	"backend/internal/handler"
	customMiddleware "backend/internal/middleware"
	"backend/internal/model"
	"backend/internal/repository"
	"backend/internal/service"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	log.Println("Starting OnfixLK Go MongoDB Backend...")

	// 1. Load Configurations
	cfg := config.Load()

	// 2. Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOpts := options.Client().ApplyURI(cfg.MongoURI)
	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		log.Fatalf("Failed to initialize MongoDB client: %v", err)
	}

	// Ping MongoDB to ensure connection is live
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Failed to connect/ping MongoDB at %s: %v", cfg.MongoURI, err)
	}
	log.Println("MongoDB connection established successfully.")

	db := client.Database(cfg.MongoDBName)

	// 3. Seed Admin User if not exists
	seedAdminUser(db, cfg)

	// 4. Initialize Repositories
	inquiryRepo := repository.NewMongoInquiryRepository(db)
	userRepo := repository.NewMongoUserRepository(db)

	// 5. Initialize Services
	emailService := service.NewEmailService(cfg)
	authService := service.NewAuthService(userRepo, cfg)
	inquiryService := service.NewInquiryService(inquiryRepo, emailService)
	telemetryService := service.NewTelemetryService()

	// Start Telemetry simulation worker
	telemetryCtx, telemetryCancel := context.WithCancel(context.Background())
	defer telemetryCancel()
	telemetryService.Start(telemetryCtx)
	log.Println("Live telemetry simulated engine started.")

	// 6. Initialize Handlers
	authHandler := handler.NewAuthHandler(authService)
	inquiryHandler := handler.NewInquiryHandler(inquiryService)
	telemetryHandler := handler.NewTelemetryHandler(telemetryService)

	// 7. Setup Chi Router & Middleware
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(customMiddleware.CORS(cfg))

	// 8. Register API Routes
	r.Route("/api", func(r chi.Router) {
		// Public routes
		r.Post("/contact/submit", inquiryHandler.Create)
		r.Get("/telemetry", telemetryHandler.GetTelemetry)
		r.Post("/auth/login", authHandler.Login)

		// Protected Admin Routes
		r.Group(func(r chi.Router) {
			r.Use(customMiddleware.Auth(cfg))
			
			r.Get("/admin/inquiries", inquiryHandler.GetAll)
			r.Patch("/admin/inquiries/{id}/status", inquiryHandler.UpdateStatus)
			r.Delete("/admin/inquiries/{id}", inquiryHandler.Delete)
		})
	})

	// 9. Run Server
	serverAddr := ":" + cfg.Port
	log.Printf("Server listening on http://localhost%s\n", serverAddr)
	if err := http.ListenAndServe(serverAddr, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

func seedAdminUser(db *mongo.Database, cfg *config.Config) {
	collection := db.Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	count, err := collection.CountDocuments(ctx, bson.M{"username": cfg.AdminUsername})
	if err != nil {
		log.Fatalf("Failed to count admin users: %v", err)
	}

	if count == 0 {
		log.Printf("Seeding default admin user: %s\n", cfg.AdminUsername)
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(cfg.AdminPassword), bcrypt.DefaultCost)
		if err != nil {
			log.Fatalf("Failed to hash default admin password: %v", err)
		}

		admin := model.User{
			ID:        primitive.NewObjectID(),
			Username:  cfg.AdminUsername,
			Password:  string(hashedPassword),
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		_, err = collection.InsertOne(ctx, admin)
		if err != nil {
			log.Fatalf("Failed to seed default admin user: %v", err)
		}
		log.Println("Default admin user seeded successfully.")
	} else {
		log.Println("Admin user already exists in MongoDB database. Seeding skipped.")
	}
}
