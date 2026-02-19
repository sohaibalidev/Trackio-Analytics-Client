import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWebsites } from "@/hooks/useWebsites";
import { analyticsService } from "@/services/analytics";
import ConfirmPopup from "@/components/Websites/ConfirmPopup";
import AnalyticsHeader from "@/components/Analytics/AnalyticsHeader";
import AnalyticsStats from "@/components/Analytics/AnalyticsStats";
import AnalyticsCharts from "@/components/Analytics/AnalyticsCharts";
import AnalyticsTabs from "@/components/Analytics/AnalyticsTabs";
import styles from "./Analytics.module.css";

const Analytics = () => {
  const {
    deleteVisitById,
    selectedWebsite,
    setSelectedWebsite,
    period,
    setPeriod,
  } = useWebsites();

  const location = useLocation();
  const navigate = useNavigate();
  const { websites } = useWebsites();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    websiteId: null,
  });

  const showConfirm = (websiteId, analyticsId) => {
    setConfirmState({
      isOpen: true,
      websiteId,
      analyticsId,
    });
  };

  const handleConfirm = async () => {
    const { websiteId, analyticsId } = confirmState;

    try {
      await deleteVisitById(websiteId, analyticsId);
      fetchAnalyticsData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setConfirmState({ isOpen: false, websiteId: null, analyticsId: null });
    }
  };

  const handleClose = () => {
    setConfirmState({ isOpen: false, websiteId: null, analyticsId: null });
  };

  useEffect(() => {
    if (selectedWebsite) {
      fetchAnalyticsData();
      const params = new URLSearchParams(location.search);
      params.set("website", selectedWebsite._id);
      params.set("period", period);
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [selectedWebsite, period]);

  const handleDelete = (websiteId, analyticsId) => {
    showConfirm(websiteId, analyticsId);
  };

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await analyticsService.getWebsiteAnalytics(
        selectedWebsite._id,
        period,
      );
      setAnalyticsData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (!analyticsData?.analytics) return [];
    const groupedData = {};
    analyticsData.analytics.forEach((item) => {
      const date = new Date(item.timestamp);
      let key;

      if (period === "24h") {
        key = `${date.getHours()}:00`;
      } else {
        key = date.toLocaleDateString();
      }

      if (!groupedData[key]) {
        groupedData[key] = { time: key, visitors: 0, pageviews: 0 };
      }
      groupedData[key].visitors += 1;
      groupedData[key].pageviews += 1;
    });

    return Object.values(groupedData);
  };

  const getDeviceData = () => {
    if (!analyticsData?.analytics) return [];
    const deviceCount = {};
    analyticsData.analytics.forEach((item) => {
      const device = item.device || "Unknown";
      deviceCount[device] = (deviceCount[device] || 0) + 1;
    });
    return Object.entries(deviceCount).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  };

  const getBrowserData = () => {
    if (!analyticsData?.analytics) return [];
    const browserCount = {};
    analyticsData.analytics.forEach((item) => {
      const browser =
        item.browser || item.userAgent?.split(" ")[0] || "Unknown";
      browserCount[browser] = (browserCount[browser] || 0) + 1;
    });
    return Object.entries(browserCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getOsData = () => {
    if (!analyticsData?.analytics) return [];
    const osCount = {};
    analyticsData.analytics.forEach((item) => {
      const os = item.os || "Unknown";
      osCount[os] = (osCount[os] || 0) + 1;
    });
    return Object.entries(osCount).map(([name, value]) => ({ name, value }));
  };

  const getCountryData = () => {
    if (!analyticsData?.analytics) return [];
    const countryCount = {};
    analyticsData.analytics.forEach((item) => {
      const country = item.country || "Unknown";
      countryCount[country] = (countryCount[country] || 0) + 1;
    });
    return Object.entries(countryCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0s";

    if (seconds >= 3600) {
      const hours = (seconds / 3600).toFixed(1);
      return `${hours}h`;
    }

    if (seconds >= 60) {
      const minutes = (seconds / 60).toFixed(1);
      return `${minutes}m`;
    }

    return `${seconds.toFixed(1)}s`;
  };

  const formatBattery = (level, charging) => {
    if (level === undefined || level === null) return "N/A";
    return `${Math.round(level * 100)}%${charging ? " - Charging" : ""}`;
  };

  if (loading && !analyticsData) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <AnalyticsHeader
        selectedWebsite={selectedWebsite}
        setSelectedWebsite={setSelectedWebsite}
        period={period}
        setPeriod={setPeriod}
        websites={websites}
        fetchAnalyticsData={fetchAnalyticsData}
        loading={loading}
      />

      {analyticsData && selectedWebsite && (
        <>
          <AnalyticsStats
            analyticsData={analyticsData}
            formatDuration={formatDuration}
          />

          <AnalyticsCharts
            period={period}
            getChartData={getChartData}
            getDeviceData={getDeviceData}
            getBrowserData={getBrowserData}
            getOsData={getOsData}
            getCountryData={getCountryData}
          />

          <AnalyticsTabs
            formatDate={formatDate}
            analyticsData={analyticsData}
            expandedRows={expandedRows}
            toggleRowExpansion={toggleRowExpansion}
            onDelete={(websiteId, analyticsId) => {
              handleDelete(websiteId, analyticsId);
            }}
            formatDuration={formatDuration}
            formatBattery={formatBattery}
          />
        </>
      )}

      <ConfirmPopup
        isOpen={confirmState.isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Delete Website"
        message="Are you sure you want to delete this view?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Analytics;
