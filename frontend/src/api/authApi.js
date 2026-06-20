import apiClient from './axiosConfig';

export const authApi = {
  /**
   * Register a new user
   * @param {Object} userData - { email, password }
   */
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Log in an existing user
   * FastAPI's OAuth2PasswordRequestForm strictly requires form data, not JSON.
   * @param {string} email 
   * @param {string} password 
   */
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI OAuth2 expects 'username', even if it's an email
    formData.append('password', password);

    const response = await apiClient.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  /**
   * Fetch current user profile (Assuming you add this endpoint to FastAPI later)
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }
};