import styles from "./AnalyticsTechnical.module.css";

const AnalyticsTechnical = ({ analyticsData, getConnectionIcon }) => {
  const getScreenResolutions = () => {
    if (!analyticsData?.analytics) return [];

    const resolutions = analyticsData.analytics.reduce((acc, item) => {
      const res = `${item.screenResolution?.width || 0}x${item.screenResolution?.height || 0}`;
      acc[res] = (acc[res] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(resolutions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);
  };

  const getNetworkConnections = () => {
    if (!analyticsData?.analytics) return [];

    const connections = analyticsData.analytics.reduce((acc, item) => {
      const type = item.connection?.effectiveType || "unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(connections);
  };

  const screenResolutions = getScreenResolutions();
  const networkConnections = getNetworkConnections();

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Screen Resolutions</h3>
          <div className={styles.list}>
            {screenResolutions.map(([resolution, count]) => (
              <div key={resolution} className={styles.listItem}>
                <div className={styles.resolutionInfo}>
                  <span className={styles.resolutionValue}>{resolution}</span>
                </div>
                <div className={styles.resolutionCount}>{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Network Connections</h3>
          <div className={styles.networkGrid}>
            {networkConnections.map(([type, count]) => (
              <div key={type} className={styles.networkCard}>
                <div className={styles.networkHeader}>
                  <div className={styles.networkIcon}>
                    {getConnectionIcon(type)}
                  </div>
                  <div className={styles.networkInfo}>
                    <span className={styles.networkType}>{type}</span>
                  </div>
                </div>
                <div className={styles.networkCount}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTechnical;
