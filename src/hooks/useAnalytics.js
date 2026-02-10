import { useState, useEffect } from "react";
import api from "../services/api";

export const useAnalytics = (websiteId, period = "24h") => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/analytics/website/${websiteId}`, {
          params: { period },
        });
        setAnalytics(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    if (websiteId) {
      fetchAnalytics();
    }
  }, [websiteId, period]);

  return { analytics, loading, error };
};

export const useDashboardStats = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalVisitors: 0,
    totalPageViews: 0,
    activeSessions: 0,
    deviceData: [],
    chartData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/analytics/dashboard");
        setDashboardStats(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch dashboard stats",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return { dashboardStats, loading, error };
};
