package service

import (
	"context"
	"errors"
	"testing"

	"backend/internal/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type mockInquiryRepository struct {
	inquiries []model.Inquiry
}

func (m *mockInquiryRepository) Create(ctx context.Context, inquiry *model.Inquiry) error {
	if inquiry.ID.IsZero() {
		inquiry.ID = primitive.NewObjectID()
	}
	m.inquiries = append(m.inquiries, *inquiry)
	return nil
}

func (m *mockInquiryRepository) GetAll(ctx context.Context) ([]model.Inquiry, error) {
	return m.inquiries, nil
}

func (m *mockInquiryRepository) GetByID(ctx context.Context, id primitive.ObjectID) (*model.Inquiry, error) {
	for _, in := range m.inquiries {
		if in.ID == id {
			return &in, nil
		}
	}
	return nil, errors.New("not found")
}

func (m *mockInquiryRepository) Update(ctx context.Context, inquiry *model.Inquiry) error {
	for i, in := range m.inquiries {
		if in.ID == inquiry.ID {
			m.inquiries[i] = *inquiry
			return nil
		}
	}
	return errors.New("not found")
}

func (m *mockInquiryRepository) Delete(ctx context.Context, id primitive.ObjectID) error {
	for i, in := range m.inquiries {
		if in.ID == id {
			m.inquiries = append(m.inquiries[:i], m.inquiries[i+1:]...)
			return nil
		}
	}
	return errors.New("not found")
}

type mockEmailService struct {
	sentInquiries []*model.Inquiry
}

func (m *mockEmailService) SendInquiryNotification(inquiry *model.Inquiry) error {
	m.sentInquiries = append(m.sentInquiries, inquiry)
	return nil
}

func TestCreateInquiry(t *testing.T) {
	repo := &mockInquiryRepository{}
	emailSvc := &mockEmailService{}
	svc := NewInquiryService(repo, emailSvc)

	t.Run("Valid Inquiry Creation", func(t *testing.T) {
		input := model.InquiryCreateInput{
			Name:     "Alan Turing",
			Email:    "turing@onfix.lk",
			Company:  "Bletchley Park",
			Phone:    "+9477123456",
			Message:  "Requesting systems audit.",
			Interest: "pos",
		}

		inquiry, err := svc.CreateInquiry(context.Background(), input)
		if err != nil {
			t.Fatalf("expected no error, got %v", err)
		}

		if inquiry.Name != "Alan Turing" {
			t.Errorf("expected Alan Turing, got %s", inquiry.Name)
		}
		if inquiry.Interest != "pos" {
			t.Errorf("expected pos, got %s", inquiry.Interest)
		}
		if inquiry.Status != "pending" {
			t.Errorf("expected pending, got %s", inquiry.Status)
		}
		if inquiry.ID.IsZero() {
			t.Error("expected ID to be set, got zero ObjectID")
		}
	})

	t.Run("Missing Name Validation", func(t *testing.T) {
		input := model.InquiryCreateInput{
			Email:   "turing@onfix.lk",
			Message: "Requesting audit.",
		}

		_, err := svc.CreateInquiry(context.Background(), input)
		if err == nil {
			t.Fatal("expected error, got nil")
		}
		if err.Error() != "name is required" {
			t.Errorf("expected name is required, got %s", err.Error())
		}
	})

	t.Run("Invalid Email Validation", func(t *testing.T) {
		input := model.InquiryCreateInput{
			Name:    "Alan",
			Email:   "invalid-email",
			Message: "Requesting audit.",
		}

		_, err := svc.CreateInquiry(context.Background(), input)
		if err == nil {
			t.Fatal("expected error, got nil")
		}
		if err.Error() != "invalid email format" {
			t.Errorf("expected invalid email format, got %s", err.Error())
		}
	})
}
