import { useState, useEffect } from "react";
import { analyticsService } from "@/services/analytics";

export const useWebsites = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const response = await analyticsService.getWebsites();
      setWebsites(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch websites");
    } finally {
      setLoading(false);
    }
  };

  const createWebsite = async (websiteData) => {
    try {
      const response = await analyticsService.createWebsite(websiteData);
      await fetchWebsites();
      return response;
    } catch (err) {
      throw err.response?.data?.message || "Failed to create website";
    }
  };

  const updateWebsite = async (id, websiteData) => {
    try {
      const response = await analyticsService.updateWebsite(id, websiteData);
      await fetchWebsites();
      return response;
    } catch (err) {
      throw err.response?.data?.message || "Failed to update website";
    }
  };

  const deleteWebsite = async (id) => {
    try {
      await analyticsService.deleteWebsite(id);
      await fetchWebsites();
    } catch (err) {
      throw err.response?.data?.message || "Failed to delete website";
    }
  };

  const deleteVisitById = async (websiteId, AnalyticsId) => {
    try {
      await analyticsService.deleteVisitById(websiteId, AnalyticsId);
      await fetchWebsites();
    } catch (err) {
      throw err.response?.data?.message || "Failed to delete visit";
    }
  };

  const clearAnalytics = async (id) => {
    try {
      await analyticsService.clearAnalytics(id);
      await fetchWebsites();
    } catch (err) {
      throw err.response?.data?.message || "Failed to clear analytics";
    }
  };

  const regenerateApiKey = async (id) => {
    try {
      const response = await analyticsService.regenerateApiKey(id);
      await fetchWebsites();
      return response;
    } catch (err) {
      throw err.response?.data?.message || "Failed to regenerate API key";
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return {
    websites,
    loading,
    error,
    selectedWebsite,
    setSelectedWebsite,
    fetchWebsites,
    createWebsite,
    updateWebsite,
    deleteWebsite,
    clearAnalytics,
    deleteVisitById,
    regenerateApiKey,
  };
};
