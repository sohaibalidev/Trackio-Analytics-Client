import { useState, useEffect } from "react";
import { useWebsites } from "@/hooks/useWebsites";
import { useDashboardStats } from "@/hooks/useAnalytics";
import { Globe, Users, Eye, TrendingUp, Clock } from "lucide-react";
import StatsCard from "@/components/Dashboard/StatsCard";
import WebsiteCard from "@/components/Dashboard/WebsiteCard";
import AnalyticsChart from "@/components/Dashboard/AnalyticsChart";
import DeviceChart from "@/components/Dashboard/DeviceChart";
import ScriptModal from "@/components/Websites/ScriptModal";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const {
    websites,
    selectedWebsite,
    setSelectedWebsite,
    loading: websitesLoading,
    error: websitesError,
  } = useWebsites();
  const {
    dashboardStats,
    loading: statsLoading,
    error: statsError,
  } = useDashboardStats();

  const [showScriptModal, setShowScriptModal] = useState(false);
  const [stats, setStats] = useState({
    avgSessionDuration: 0,
    totalWebsites: 0,
    totalVisitors: 0,
    totalPageViews: 0,
    activeSessions: 0,
  });

  useEffect(() => {
    setStats({
      totalWebsites: websites.length,
      avgSessionDuration: dashboardStats.avgSessionDuration,
      totalVisitors: dashboardStats.totalVisitors,
      totalPageViews: dashboardStats.totalPageViews,
      activeSessions: dashboardStats.activeSessions,
    });
  }, [websites, dashboardStats]);

  const handleShowScript = (website) => {
    setSelectedWebsite(website);
    setShowScriptModal(true);
  };

  const loading = websitesLoading || statsLoading;
  const error = websitesError || statsError;

  if (loading) {
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
      <div className={styles.cardHeader}>
        <h2 className={styles.mainTitle}>Dashboard Overview</h2>
        <p className={styles.subTitle}>
          Last month • {websites.length} websites tracked
        </p>
      </div>

      <div className={styles.grid4}>
        <StatsCard
          title="Avg Session Duration"
          value={stats.avgSessionDuration}
          icon={<Clock size={24} />}
          color="var(--primary-accent)"
        />
        <StatsCard
          title="Total Visitors"
          value={stats.totalVisitors}
          icon={<Users size={24} />}
          color="var(--success)"
          change={12.5}
        />
        <StatsCard
          title="Page Views"
          value={stats.totalPageViews}
          icon={<Eye size={24} />}
          color="var(--warning-color, #ff9800)"
          change={8.3}
        />
        <StatsCard
          title="Active Sessions"
          value={stats.activeSessions}
          icon={<TrendingUp size={24} />}
          color="var(--secondary-color, #9c27b0)"
        />
      </div>

      <div className={styles.grid2}>
        <AnalyticsChart
          data={dashboardStats.chartData}
          title="Traffic Overview"
        />
        <DeviceChart
          data={dashboardStats.deviceData}
          title="Device Distribution"
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <div className={styles.websitesHeader}>
          <h3 className={styles.websitesTitle}>Your Websites</h3>
          {websites.length > 0 && (
            <p className={styles.websitesSubtitle}>
              Showing {Math.min(websites.length, 4)} of {websites.length}{" "}
              websites
            </p>
          )}
        </div>

        {websites.length === 0 ? (
          <div className={styles.emptyStateCard}>
            <div className={styles.emptyStateContent}>
              <p className={styles.emptyStateText}>
                No websites added yet. Add your first website to start tracking!
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.grid2}>
            {websites.slice(0, 4).map((website) => (
              <WebsiteCard
                key={website._id}
                website={website}
                onShowScript={handleShowScript}
              />
            ))}
          </div>
        )}
      </div>

      {showScriptModal && selectedWebsite && (
        <ScriptModal
          website={selectedWebsite}
          onClose={() => {
            setShowScriptModal(false);
            setSelectedWebsite(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
