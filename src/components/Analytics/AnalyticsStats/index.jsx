import { Users, Eye, Clock, Monitor } from "lucide-react";
import styles from "./AnalyticsStats.module.css";

const AnalyticsStats = ({ analyticsData, formatDuration }) => {
  const stats = [
    {
      title: "Total Visitors",
      value: analyticsData.stats?.totalVisitors || 0,
      icon: <Users size={24} />,
      description: "Unique visitors in selected period",
      color: "var(--success, #43a047)",
    },
    {
      title: "Page Views",
      value: analyticsData.stats?.totalPageViews || 0,
      icon: <Eye size={24} />,
      description: "Total page views",
      color: "var(--warning-color, #ff9800)",
    },
    {
      title: "Avg. Session",
      value: formatDuration(analyticsData.stats?.avgSessionDuration || 0),
      icon: <Clock size={24} />,
      description: "Average session duration",
      color: "var(--primary-accent, #d4af37)",
    },
    {
      title: "Top Device",
      value: analyticsData.stats?.devices?.[0]?._id || "N/A",
      icon: <Monitor size={24} />,
      description: "Most used device type",
      color: "var(--secondary-color, #9c27b0)",
    },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <h4 className={styles.statTitle}>{stat.title}</h4>
          </div>
          <div className={styles.statValue}>{stat.value}</div>
          <p className={styles.statDescription}>{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsStats;
