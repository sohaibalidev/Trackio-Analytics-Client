import api from "./api";

export const analyticsService = {
  trackPageView: async (data) => {
    const response = await api.post("/api/analytics/track", data);
    return response.data;
  },

  getWebsiteAnalytics: async (websiteId, period = "24h") => {
    const response = await api.get(
      `/api/analytics/website/${websiteId}?period=${period}`,
    );
    return response.data;
  },

  createWebsite: async (websiteData) => {
    const response = await api.post("/api/websites", websiteData);
    return response.data;
  },

  getWebsites: async () => {  
    const response = await api.get("/api/websites");
    return response.data;
  },

  getWebsite: async (id) => {
    const response = await api.get(`/api/websites/${id}`);
    return response.data;
  },

  updateWebsite: async (id, websiteData) => {
    const response = await api.put(`/api/websites/${id}`, websiteData);
    return response.data;
  },

  deleteWebsite: async (id) => {
    const response = await api.delete(`/api/websites/${id}`);
    return response.data;
  },

  regenerateApiKey: async (id) => {
    const response = await api.post(`/api/websites/${id}/regenerate-key`);
    return response.data;
  },
};
