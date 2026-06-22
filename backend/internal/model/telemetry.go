package model

type LiveTelemetryMetrics struct {
	ActiveTerminals     int     `json:"activeTerminals"`
	MonthlyTransactions int64   `json:"monthlyTransactions"`
	ServerUptime        float64 `json:"serverUptime"`
	ApiLatencyMs        int     `json:"apiLatencyMs"`
}
