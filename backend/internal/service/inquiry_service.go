package service

import (
	"context"
	"errors"
	"log"
	"regexp"
	"strings"

	"backend/internal/model"
	"backend/internal/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type InquiryService interface {
	CreateInquiry(ctx context.Context, input model.InquiryCreateInput) (*model.Inquiry, error)
	GetAllInquiries(ctx context.Context) ([]model.Inquiry, error)
	GetInquiryByID(ctx context.Context, id primitive.ObjectID) (*model.Inquiry, error)
	UpdateInquiryStatus(ctx context.Context, id primitive.ObjectID, status string) (*model.Inquiry, error)
	DeleteInquiry(ctx context.Context, id primitive.ObjectID) error
}

type inquiryService struct {
	repo         repository.InquiryRepository
	emailService EmailService
}

func NewInquiryService(repo repository.InquiryRepository, emailService EmailService) InquiryService {
	return &inquiryService{
		repo:         repo,
		emailService: emailService,
	}
}

var emailRegex = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

func (s *inquiryService) CreateInquiry(ctx context.Context, input model.InquiryCreateInput) (*model.Inquiry, error) {
	name := strings.TrimSpace(input.Name)
	email := strings.TrimSpace(input.Email)
	message := strings.TrimSpace(input.Message)

	if name == "" {
		return nil, errors.New("name is required")
	}
	if email == "" {
		return nil, errors.New("email is required")
	}
	if !emailRegex.MatchString(email) {
		return nil, errors.New("invalid email format")
	}
	if message == "" {
		return nil, errors.New("message is required")
	}

	interest := strings.ToLower(strings.TrimSpace(input.Interest))
	if interest != "pos" && interest != "custom" && interest != "db" && interest != "general" {
		interest = "general"
	}

	inquiry := &model.Inquiry{
		ID:       primitive.NewObjectID(),
		Name:     name,
		Email:    email,
		Company:  strings.TrimSpace(input.Company),
		Phone:    strings.TrimSpace(input.Phone),
		Message:  message,
		Interest: interest,
		Status:   "pending",
	}

	if err := s.repo.Create(ctx, inquiry); err != nil {
		return nil, err
	}

	// Dispatch email asynchronously so it doesn't block the HTTP request-response flow
	go func(inq *model.Inquiry) {
		err := s.emailService.SendInquiryNotification(inq)
		if err != nil {
			log.Printf("[Email Error] Failed to send intake alert: %v\n", err)
		}
	}(inquiry)

	return inquiry, nil
}

func (s *inquiryService) GetAllInquiries(ctx context.Context) ([]model.Inquiry, error) {
	return s.repo.GetAll(ctx)
}

func (s *inquiryService) GetInquiryByID(ctx context.Context, id primitive.ObjectID) (*model.Inquiry, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *inquiryService) UpdateInquiryStatus(ctx context.Context, id primitive.ObjectID, status string) (*model.Inquiry, error) {
	status = strings.ToLower(strings.TrimSpace(status))
	if status != "pending" && status != "reviewed" && status != "resolved" {
		return nil, errors.New("invalid status, must be pending, reviewed, or resolved")
	}

	inquiry, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	inquiry.Status = status
	if err := s.repo.Update(ctx, inquiry); err != nil {
		return nil, err
	}

	return inquiry, nil
}

func (s *inquiryService) DeleteInquiry(ctx context.Context, id primitive.ObjectID) error {
	_, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return err
	}
	return s.repo.Delete(ctx, id)
}
