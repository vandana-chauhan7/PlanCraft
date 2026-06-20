import apiClient from './axiosConfig';

export const plannerApi = {
  getAll: async () => {
    const response = await apiClient.get('/planners/');
    return response.data;
  },

  getById: async (plannerId) => {
    const response = await apiClient.get(`/planners/${plannerId}`);
    return response.data;
  },

  create: async (plannerData) => {
    const response = await apiClient.post('/planners/', plannerData);
    return response.data;
  },

  update: async (plannerId, plannerData) => {
    const response = await apiClient.put(`/planners/${plannerId}`, plannerData);
    return response.data;
  },

  delete: async (plannerId) => {
    const response = await apiClient.delete(`/planners/${plannerId}`);
    return response.data;
  },
};
