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
    // Simulate API Network Request Latency (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Client-side validation fallback
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: 'Required fields are missing. Please verify your input.',
      };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'Invalid email address format.',
      };
    }

    // Success response mock
    console.log('[API POST /api/contact/submit] Payload:', data);
    return {
      success: true,
      message: 'Thank you. Our engineering team has received your architecture review request. We will follow up within 24 hours.',
    };
  }
};
