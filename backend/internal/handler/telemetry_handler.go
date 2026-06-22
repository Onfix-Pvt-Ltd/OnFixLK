package handler

import (
	"net/http"

	"backend/internal/service"
)

type TelemetryHandler struct {
	telemetryService service.TelemetryService
}

func NewTelemetryHandler(telemetryService service.TelemetryService) *TelemetryHandler {
	return &TelemetryHandler{telemetryService: telemetryService}
}

func (h *TelemetryHandler) GetTelemetry(w http.ResponseWriter, r *http.Request) {
	metrics := h.telemetryService.GetMetrics()
	// Return the raw metrics object as expected by the frontend
	RespondWithJSON(w, http.StatusOK, metrics)
}
