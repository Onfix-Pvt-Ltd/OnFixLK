package repository

import (
	"context"
	"time"

	"backend/internal/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type InquiryRepository interface {
	Create(ctx context.Context, inquiry *model.Inquiry) error
	GetAll(ctx context.Context) ([]model.Inquiry, error)
	GetByID(ctx context.Context, id primitive.ObjectID) (*model.Inquiry, error)
	Update(ctx context.Context, inquiry *model.Inquiry) error
	Delete(ctx context.Context, id primitive.ObjectID) error
}

type mongoInquiryRepository struct {
	collection *mongo.Collection
}

func NewMongoInquiryRepository(db *mongo.Database) InquiryRepository {
	return &mongoInquiryRepository{
		collection: db.Collection("inquiries"),
	}
}

func (r *mongoInquiryRepository) Create(ctx context.Context, inquiry *model.Inquiry) error {
	if inquiry.ID.IsZero() {
		inquiry.ID = primitive.NewObjectID()
	}
	inquiry.CreatedAt = time.Now()
	inquiry.UpdatedAt = time.Now()
	_, err := r.collection.InsertOne(ctx, inquiry)
	return err
}

func (r *mongoInquiryRepository) GetAll(ctx context.Context) ([]model.Inquiry, error) {
	var inquiries []model.Inquiry
	opts := options.Find().SetSort(bson.D{{Key: "created_at", Value: -1}})
	cursor, err := r.collection.Find(ctx, bson.M{}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &inquiries); err != nil {
		return nil, err
	}

	if inquiries == nil {
		inquiries = []model.Inquiry{}
	}

	return inquiries, nil
}

func (r *mongoInquiryRepository) GetByID(ctx context.Context, id primitive.ObjectID) (*model.Inquiry, error) {
	var inquiry model.Inquiry
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&inquiry)
	if err != nil {
		return nil, err
	}
	return &inquiry, nil
}

func (r *mongoInquiryRepository) Update(ctx context.Context, inquiry *model.Inquiry) error {
	inquiry.UpdatedAt = time.Now()
	_, err := r.collection.ReplaceOne(
		ctx,
		bson.M{"_id": inquiry.ID},
		inquiry,
	)
	return err
}

func (r *mongoInquiryRepository) Delete(ctx context.Context, id primitive.ObjectID) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}
