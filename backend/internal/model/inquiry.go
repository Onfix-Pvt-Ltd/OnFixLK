package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Inquiry struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name      string             `bson:"name" json:"name"`
	Email     string             `bson:"email" json:"email"`
	Company   string             `bson:"company" json:"company"`
	Phone     string             `bson:"phone" json:"phone"`
	Message   string             `bson:"message" json:"message"`
	Interest  string             `bson:"interest" json:"interest"` // pos, custom, db, general
	Status    string             `bson:"status" json:"status"`     // pending, reviewed, resolved
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`
}

type InquiryCreateInput struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Company  string `json:"company"`
	Phone    string `json:"phone"`
	Message  string `json:"message"`
	Interest string `json:"interest"`
}

type InquiryStatusUpdateInput struct {
	Status string `json:"status"`
}
