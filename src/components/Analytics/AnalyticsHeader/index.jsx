import { RefreshCw } from "lucide-react";
import styles from "./AnalyticsHeader.module.css";

const AnalyticsHeader = ({
  selectedWebsite,
  setSelectedWebsite,
  period,
  setPeriod,
  websites,
  fetchAnalyticsData,
  loading,
}) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Analytics Dashboard</h2>
      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <select
            value={selectedWebsite}
            onChange={(e) => setSelectedWebsite(e.target.value)}
            className={styles.select}
          >
            {websites.map((website) => (
              <option key={website._id} value={website._id}>
                {website.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={styles.select}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
          <button
            className={`${styles.refreshButton} ${loading ? styles.loading : ""}`}
            onClick={fetchAnalyticsData}
            disabled={loading}
          >
            <RefreshCw size={14} className={styles.refreshIcon} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
