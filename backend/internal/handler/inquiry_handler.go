package handler

import (
	"encoding/json"
	"net/http"

	"backend/internal/model"
	"backend/internal/service"

	"github.com/go-chi/chi/v5"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type InquiryHandler struct {
	inquiryService service.InquiryService
}

func NewInquiryHandler(inquiryService service.InquiryService) *InquiryHandler {
	return &InquiryHandler{inquiryService: inquiryService}
}

func (h *InquiryHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input model.InquiryCreateInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	inquiry, err := h.inquiryService.CreateInquiry(r.Context(), input)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	RespondWithSuccess(w, http.StatusCreated, "Thank you. Our engineering team has received your architecture review request. We will follow up within 24 hours.", inquiry)
}

func (h *InquiryHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	inquiries, err := h.inquiryService.GetAllInquiries(r.Context())
	if err != nil {
		RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	RespondWithSuccess(w, http.StatusOK, "Inquiries retrieved successfully", inquiries)
}

func (h *InquiryHandler) UpdateStatus(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	idVal, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid ID format")
		return
	}

	var input model.InquiryStatusUpdateInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	inquiry, err := h.inquiryService.UpdateInquiryStatus(r.Context(), idVal, input.Status)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	RespondWithSuccess(w, http.StatusOK, "Status updated successfully", inquiry)
}

func (h *InquiryHandler) Delete(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	idVal, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid ID format")
		return
	}

	err = h.inquiryService.DeleteInquiry(r.Context(), idVal)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	RespondWithSuccess(w, http.StatusOK, "Inquiry deleted successfully", nil)
}
