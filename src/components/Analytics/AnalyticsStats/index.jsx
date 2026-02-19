import {
  Users,
  Clock,
  Globe2,
  Monitor,
} from "lucide-react";
import styles from "./AnalyticsStats.module.css";

const AnalyticsStats = ({ analyticsData, formatDuration }) => {
  const { analytics = [], stats = {} } = analyticsData;

  const totalPageViews = analytics.length;
  const visitors = new Set(analytics.map((a) => a.visitorId)).size;
  const countries = new Set(analytics.map((a) => a.country).filter(Boolean))
    .size;

  const devices = {
    mobile: analytics.filter((a) => a.device?.toLowerCase().includes("mobile"))
      .length,
    desktop: analytics.filter((a) =>
      a.device?.toLowerCase().includes("desktop"),
    ).length,
    tablet: analytics.filter((a) =>
      a.device?.toLowerCase().includes("tablet"),
    ).length
  };

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div
          className={styles.statIcon}
          style={{ background: "rgba(33, 150, 243, 0.1)" }}
        >
          <Users size={24} color="#2196F3" />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Total Views</span>
          <span className={styles.statValue}>{totalPageViews}</span>
          <span className={styles.statSubtext}>visitors: {visitors}</span>
        </div>
      </div>

      <div className={styles.statCard}>
        <div
          className={styles.statIcon}
          style={{ background: "rgba(76, 175, 80, 0.1)" }}
        >
          <Clock size={24} color="#4CAF50" />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Avg Session</span>
          <span className={styles.statValue}>
            {stats.avgSessionDuration}
          </span>
          <span className={styles.statSubtext}>
            Total: {formatDuration(stats.totalDuration)}
          </span>
        </div>
      </div>

      <div className={styles.statCard}>
        <div
          className={styles.statIcon}
          style={{ background: "rgba(255, 152, 0, 0.1)" }}
        >
          <Globe2 size={24} color="#FF9800" />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Countries</span>
          <span className={styles.statValue}>{countries}</span>
          <span className={styles.statSubtext}>
            Regions:{" "}
            {new Set(analytics.map((a) => a.region).filter(Boolean)).size}
          </span>
        </div>
      </div>

      <div className={styles.statCard}>
        <div
          className={styles.statIcon}
          style={{ background: "rgba(156, 39, 176, 0.1)" }}
        >
          <Monitor size={24} color="#9C27B0" />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Devices</span>
          <span className={styles.statValue}>
            {devices.desktop + devices.mobile + devices.tablet}
          </span>
          <span className={styles.statSubtext}>
            Mobile: {devices.mobile} | Desktop: {devices.desktop} <br />Tablet: {devices.tablet}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsStats;
