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
    // Simulate API retrieval delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Base static values that get minor randomized offsets in frontend polling
    return {
      activeTerminals: 14820,
      monthlyTransactions: 42918504,
      serverUptime: 99.9997,
      apiLatencyMs: 14,
    };
  }
};
