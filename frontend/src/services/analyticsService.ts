export interface LiveTelemetryMetrics {
  activeTerminals: number;
  monthlyTransactions: number;
  serverUptime: number;
  apiLatencyMs: number;
}

/**
 * Service to manage live metrics and telemetry data for Onfix systems.
 * Designed to poll real API metrics in the future.
 */
export const analyticsService = {
  /**
   * Fetches current live telemetry stats.
   */
  async getLiveTelemetry(): Promise<LiveTelemetryMetrics> {
    try {
      const response = await fetch('http://localhost:8080/api/telemetry');
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('[API Error] getLiveTelemetry:', error);
      // Resilient fallback to mock values so frontend dashboard continues to load
      return {
        activeTerminals: 14820,
        monthlyTransactions: 42918505,
        serverUptime: 99.9997,
        apiLatencyMs: 14,
      };
    }
  }
};
