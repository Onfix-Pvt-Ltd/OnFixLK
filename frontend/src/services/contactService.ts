export interface ContactRequestData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  interest: 'pos' | 'custom' | 'consulting' | 'general';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Service to manage all contact-related API communications.
 * Easily switch this from mock to a live API endpoint by changing the fetch implementation.
 */
export const contactService = {
  /**
   * Submits contact inquiry to backend server.
   */
  async submitInquiry(data: ContactRequestData): Promise<ApiResponse<null>> {
    try {
      const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
      const response = await fetch(`${API_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resJson = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          message: resJson.message || `Server error: ${response.status}`,
        };
      }

      return {
        success: true,
        message: resJson.message || 'Thank you. Our engineering team has received your architecture review request. We will follow up within 24 hours.',
      };
    } catch (error) {
      console.error('[API Error] submitInquiry:', error);
      return {
        success: false,
        message: 'An unexpected network error occurred. Please ensure the backend server is running.',
      };
    }
  }
};
