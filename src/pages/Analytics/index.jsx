import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useWebsites } from "@/hooks/useWebsites";
import { analyticsService } from "@/services/analytics";
import { Globe } from "lucide-react";
import AnalyticsHeader from "@/components/Analytics/AnalyticsHeader";
import AnalyticsStats from "@/components/Analytics/AnalyticsStats";
import AnalyticsCharts from "@/components/Analytics/AnalyticsCharts";
import AnalyticsTabs from "@/components/Analytics/AnalyticsTabs";
import styles from "./Analytics.module.css";

const Analytics = () => {
  const location = useLocation();
  const { websites } = useWebsites();
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [period, setPeriod] = useState("24h");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const websiteId = params.get("website");
    if (websiteId && websites.length > 0) {
      const website = websites.find((w) => w._id === websiteId);
      if (website) {
        setSelectedWebsite(websiteId);
      }
    } else if (websites.length > 0) {
      setSelectedWebsite(websites[0]._id);
    }
  }, [location.search, websites]);

  useEffect(() => {
    if (selectedWebsite) {
      fetchAnalyticsData();
    }
  }, [selectedWebsite, period]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await analyticsService.getWebsiteAnalytics(
        selectedWebsite,
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
    if (!analyticsData?.stats?.devices) return [];
    return analyticsData.stats.devices.map((device) => ({
      name: device._id,
      value: device.count,
    }));
  };

  const getBrowserData = () => {
    if (!analyticsData?.stats?.browsers) return [];
    return analyticsData.stats.browsers
      .filter((browser) => browser._id)
      .map((browser) => ({
        name: browser._id,
        value: browser.count,
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
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const getConnectionIcon = (effectiveType) => {
    switch (effectiveType) {
      case "slow-2g":
        return "2G";
      case "2g":
        return "2G";
      case "3g":
        return "3G";
      case "4g":
        return "4G";
      case "5g":
        return "5G";
      default:
        return "?";
    }
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
      <div className={styles.errorCard}>
        <div className={styles.errorText}>Error: {error}</div>
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

      {analyticsData && selectedWebsite ? (
        <>
          <AnalyticsStats
            analyticsData={analyticsData}
            formatDuration={formatDuration}
          />

          <AnalyticsCharts
            period={period}
            getChartData={getChartData}
            getDeviceData={getDeviceData}
          />

          <AnalyticsTabs
            tabValue={tabValue}
            setTabValue={setTabValue}
            analyticsData={analyticsData}
            expandedRows={expandedRows}
            toggleRowExpansion={toggleRowExpansion}
            formatDate={formatDate}
            formatDuration={formatDuration}
            getConnectionIcon={getConnectionIcon}
            getBrowserData={getBrowserData}
            getDeviceData={getDeviceData}
          />
        </>
      ) : (
        !selectedWebsite && (
          <div className={styles.emptyState}>
            <Globe size={60} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No website selected</h3>
            <p className={styles.emptyText}>
              Please select a website to view analytics data
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Analytics;
