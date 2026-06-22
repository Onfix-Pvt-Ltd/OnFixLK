package handler

import (
	"encoding/json"
	"net/http"

	"backend/internal/model"
	"backend/internal/service"
)

type AuthHandler struct {
	authService service.AuthService
}

func NewAuthHandler(authService service.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var input model.LoginInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if input.Username == "" || input.Password == "" {
		RespondWithError(w, http.StatusBadRequest, "Username and password are required")
		return
	}

	res, err := h.authService.Login(r.Context(), input.Username, input.Password)
	if err != nil {
		RespondWithError(w, http.StatusUnauthorized, err.Error())
		return
	}

	RespondWithSuccess(w, http.StatusOK, "Login successful", res)
}
