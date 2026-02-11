import AnalyticsTable from "./AnalyticsTable/index.jsx";
import AnalyticsBrowserOS from "./AnalyticsBrowserOS/index.jsx";
import AnalyticsTechnical from "./AnalyticsTechnical/index.jsx";
import styles from "./AnalyticsTabs.module.css";

const AnalyticsTabs = ({
  tabValue,
  setTabValue,
  analyticsData,
  expandedRows,
  toggleRowExpansion,
  formatDate,
  onDelete,
  formatDuration,
  getConnectionIcon,
  getBrowserData,
  getDeviceData,
}) => {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabHeaders}>
        <button
          className={`${styles.tab} ${tabValue === 0 ? styles.active : ""}`}
          onClick={() => setTabValue(0)}
        >
          Sessions
        </button>
        <button
          className={`${styles.tab} ${tabValue === 1 ? styles.active : ""}`}
          onClick={() => setTabValue(1)}
        >
          Browser & OS
        </button>
        <button
          className={`${styles.tab} ${tabValue === 2 ? styles.active : ""}`}
          onClick={() => setTabValue(2)}
        >
          Technical Details
        </button>
      </div>

      <div className={styles.tabContent}>
        {tabValue === 0 && (
          <AnalyticsTable
            analyticsData={analyticsData}
            expandedRows={expandedRows}
            toggleRowExpansion={toggleRowExpansion}
            formatDate={formatDate}
            onDelete={onDelete}
            formatDuration={formatDuration}
            getConnectionIcon={getConnectionIcon}
          />
        )}

        {tabValue === 1 && (
          <AnalyticsBrowserOS
            getBrowserData={getBrowserData}
            getDeviceData={getDeviceData}
          />
        )}

        {tabValue === 2 && (
          <AnalyticsTechnical
            analyticsData={analyticsData}
            getConnectionIcon={getConnectionIcon}
          />
        )}
      </div>
    </div>
  );
};

export default AnalyticsTabs;
