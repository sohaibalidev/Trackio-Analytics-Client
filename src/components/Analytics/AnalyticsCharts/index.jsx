import { TrendingUp, Monitor } from "lucide-react";
import AnalyticsChart from "@/components/Dashboard/AnalyticsChart";
import DeviceChart from "@/components/Dashboard/DeviceChart";
import styles from "./AnalyticsCharts.module.css";

const AnalyticsCharts = ({
  period,
  getChartData,
  getDeviceData,
}) => {
  const periodText = {
    "24h": "Last 24 Hours",
    "7d": "Last 7 Days",
    "30d": "Last 30 Days",
  };

  return (
    <div className={styles.chartsGrid}>
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div className={styles.chartTitle}>
            <TrendingUp size={20} className={styles.chartIcon} />
            <h3>Traffic Overview</h3>
          </div>
          <span className={styles.period}>{periodText[period]}</span>
        </div>
        <div className={styles.chartContainer}>
          <AnalyticsChart data={getChartData()} />
        </div>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div className={styles.chartTitle}>
            <Monitor size={20} className={styles.chartIcon} />
            <h3>Device Distribution</h3>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <DeviceChart data={getDeviceData()} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
