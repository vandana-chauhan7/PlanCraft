import apiClient from './axiosConfig';

export const templateApi = {
  /**
   * Fetch all publicly available templates from the marketplace
   */
  getMarketplaceTemplates: async () => {
    const response = await apiClient.get('/templates/');
    return response.data;
  },

  /**
   * Fetch a specific template's details
   * @param {number} templateId 
   */
  getTemplateById: async (templateId) => {
    const response = await apiClient.get(`/templates/${templateId}`);
    return response.data;
  },

  /**
   * Duplicate a template into the user's own planners
   * @param {number} templateId 
   */
  duplicateTemplate: async (templateId) => {
    const response = await apiClient.post(`/templates/${templateId}/duplicate`);
    return response.data;
  },

  /**
   * Publish a user's existing planner to the public marketplace
   * @param {number} plannerId 
   */
  publishToMarketplace: async (plannerId) => {
    // This updates the is_template boolean on the backend
    const response = await apiClient.put(`/planners/${plannerId}`, { is_template: true });
    return response.data;
  }
};