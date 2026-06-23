package handler

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func RespondWithJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

func RespondWithSuccess(w http.ResponseWriter, status int, message string, data interface{}) {
	res := APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	}
	RespondWithJSON(w, status, res)
}

func RespondWithError(w http.ResponseWriter, status int, message string) {
	res := APIResponse{
		Success: false,
		Message: message,
	}
	RespondWithJSON(w, status, res)
}
