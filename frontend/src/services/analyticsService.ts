export interface LiveTelemetryMetrics {
  projectsDelivered: number;
  linesOfCode: number;
  clientSatisfaction: number;
  onTimeDelivery: number;
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
      const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
      const response = await fetch(`${API_URL}/api/telemetry`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('[API Error] getLiveTelemetry:', error);
      // Resilient fallback to mock values so frontend dashboard continues to load
      return {
        projectsDelivered: 12,
        linesOfCode: 150000,
        clientSatisfaction: 4.9,
        onTimeDelivery: 98,
      };
    }
  }
};
