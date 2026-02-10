import styles from "./AnalyticsBrowserOS.module.css";

const AnalyticsBrowserOS = ({ getBrowserData, getDeviceData }) => {
  const browserData = getBrowserData();
  const deviceData = getDeviceData();

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Browser Distribution</h3>
          <div className={styles.list}>
            {browserData.map((browser) => (
              <div key={browser.name} className={styles.listItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{browser.name}</span>
                </div>
                <div className={styles.itemCount}>{browser.value} sessions</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Device Distribution</h3>
          <div className={styles.list}>
            {deviceData.map((device) => (
              <div key={device.name} className={styles.listItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{device.name}</span>
                </div>
                <div className={styles.itemCount}>{device.value} sessions</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBrowserOS;
