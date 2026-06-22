package service

import (
	"context"
	"math/rand"
	"sync"
	"time"

	"backend/internal/model"
)

type TelemetryService interface {
	GetMetrics() model.LiveTelemetryMetrics
	Start(ctx context.Context)
}

type telemetryService struct {
	mu      sync.RWMutex
	metrics model.LiveTelemetryMetrics
}

func NewTelemetryService() TelemetryService {
	return &telemetryService{
		metrics: model.LiveTelemetryMetrics{
			ActiveTerminals:     14820,
			MonthlyTransactions: 42918504,
			ServerUptime:        99.9997,
			ApiLatencyMs:        14,
		},
	}
}

func (s *telemetryService) GetMetrics() model.LiveTelemetryMetrics {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.metrics
}

func (s *telemetryService) Start(ctx context.Context) {
	ticker := time.NewTicker(1800 * time.Millisecond)
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	go func() {
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				s.mu.Lock()
				// Tick monthly transactions: add between 15 and 60 transactions
				transAdded := int64(r.Intn(45) + 15)
				// Shift terminals: fluctuates between -3 and +3
				terminalsShift := r.Intn(7) - 3
				newTerminals := s.metrics.ActiveTerminals + terminalsShift
				if newTerminals < 12000 {
					newTerminals = 12000
				}
				// Latency fluctuates between 12ms and 16ms
				newLatency := r.Intn(5) + 12

				s.metrics.MonthlyTransactions += transAdded
				s.metrics.ActiveTerminals = newTerminals
				s.metrics.ApiLatencyMs = newLatency
				s.mu.Unlock()
			}
		}
	}()
}
