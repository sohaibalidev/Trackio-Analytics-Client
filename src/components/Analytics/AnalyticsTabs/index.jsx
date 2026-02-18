// components/AnalyticsTabs.jsx
import { useEffect, useState } from "react";
import {
  Globe,
  Monitor,
  MapPin,
  Wifi,
  Battery,
  Cpu,
  Clock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import styles from "./AnalyticsTabs.module.css";

const AnalyticsTabs = ({
  tabValue,
  setTabValue,
  analyticsData,
  expandedRows,
  toggleRowExpansion,
  formatDate,
  formatDuration,
  formatBattery,
  getBrowserData,
  getDeviceData,
  getOsData,
  getCountryData,
}) => {
  const { analytics = [] } = analyticsData;

  const tabs = [
    { id: 0, label: "All Sessions", icon: <Globe size={16} /> },
    { id: 1, label: "Devices", icon: <Monitor size={16} /> },
    { id: 2, label: "Locations", icon: <MapPin size={16} /> },
    { id: 3, label: "Network", icon: <Wifi size={16} /> },
    { id: 4, label: "Battery", icon: <Battery size={16} /> },
    { id: 5, label: "Performance", icon: <Cpu size={16} /> },
  ];

  const filterAnalytics = () => {
    switch (tabValue) {
      case 1: // Devices
        return analytics.filter((a) => a.device || a.os || a.gpu);
      case 2: // Locations
        return analytics.filter((a) => a.country || a.city || a.region);
      case 3: // Network
        return analytics.filter((a) => a.speed || a.isp);
      case 4: // Battery
        return analytics.filter((a) => a.batteryLevel !== undefined);
      case 5: // Performance
        return analytics.filter((a) => a.speed || a.gpu);
      default:
        return analytics;
    }
  };

  useEffect(() => {
    filteredAnalytics = filterAnalytics()
  }, [tabValue])

  let filteredAnalytics = filterAnalytics();

  const renderDetailedRow = (session) => (
    <div className={styles.expandedContent}>
      <div className={styles.detailGrid}>
        {session.os && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>OS:</span>
            <span className={styles.detailValue}>
              {session.os} {session.osVersion || ""}
            </span>
          </div>
        )}
        {session.device && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Device:</span>
            <span className={styles.detailValue}>{session.device}</span>
          </div>
        )}
        {session.gpu && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>GPU:</span>
            <span className={styles.detailValue}>{session.gpu}</span>
          </div>
        )}
        {session.screenResolution && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Resolution:</span>
            <span className={styles.detailValue}>
              {session.screenResolution.width} x{" "}
              {session.screenResolution.height}
            </span>
          </div>
        )}
        {session.country && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Location:</span>
            <span className={styles.detailValue}>
              {session.city}, {session.region}, {session.country}
            </span>
          </div>
        )}
        {session.isp && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>ISP:</span>
            <span className={styles.detailValue}>{session.isp}</span>
          </div>
        )}
        {session.ipAddress && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>IP:</span>
            <span className={styles.detailValue}>{session.ipAddress}</span>
          </div>
        )}
        {session.timezone && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Timezone:</span>
            <span className={styles.detailValue}>{session.timezone}</span>
          </div>
        )}
        {session.speed && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Speed:</span>
            <span className={styles.detailValue}>{session.speed} Mbps</span>
          </div>
        )}
        {session.batteryLevel !== undefined && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Battery:</span>
            <span className={styles.detailValue}>
              {formatBattery(session.batteryLevel, session.batteryCharging)}
            </span>
          </div>
        )}
        {session.referrer && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Referrer:</span>
            <span className={styles.detailValue}>{session.referrer}</span>
          </div>
        )}
        {session.pageUrl && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Page:</span>
            <span className={styles.detailValue}>
              {session.pageTitle || session.pageUrl}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${tabValue === tab.id ? styles.activeTab : ""}`}
            onClick={() => setTabValue(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "30px" }}></th>
              <th>Visitor</th>
              <th>Session</th>
              <th>Location</th>
              <th>Device</th>
              <th>Network</th>
              <th>Duration</th>
              <th>Page</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnalytics.map((session) => (
              <>
                <tr
                  key={session._id}
                  className={styles.tableRow}
                  onClick={() => toggleRowExpansion(session._id)}
                >
                  <td className={styles.expandCell}>
                    {expandedRows.includes(session._id) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </td>
                  <td>
                    <div className={styles.visitorInfo}>
                      <span className={styles.visitorId}>
                        {session.visitorId?.slice(0, 8)}...
                      </span>
                      <span className={styles.sessionId}>
                        Session: {session.sessionId?.slice(0, 6)}...
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.sessionInfo}>
                      <span className={styles.timestamp}>
                        {formatDate(session.timestamp)}
                      </span>
                      <span className={styles.lastActivity}>
                        Last: {formatDate(session.lastActivity)}
                      </span>
                    </div>
                  </td>
                  <td>
                    {session.country ? (
                      <div className={styles.locationInfo}>
                        <span>{session.country}</span>
                        {session.city && (
                          <span className={styles.city}>{session.city}</span>
                        )}
                      </div>
                    ) : (
                      <span className={styles.na}>N/A</span>
                    )}
                  </td>
                  <td>
                    {session.device ? (
                      <div className={styles.deviceInfo}>
                        <span>{session.device}</span>
                        <span className={styles.os}>
                          {session.os || "Unknown OS"}
                        </span>
                      </div>
                    ) : (
                      <span className={styles.na}>N/A</span>
                    )}
                  </td>
                  <td>
                    {session.speed ? (
                      <div className={styles.networkInfo}>
                        <span>{session.speed} Mbps</span>
                        {session.isp && (
                          <span className={styles.isp}>{session.isp}</span>
                        )}
                      </div>
                    ) : (
                      <span className={styles.na}>N/A</span>
                    )}
                  </td>
                  <td>
                    <span className={styles.duration}>
                      {formatDuration(session.sessionDuration)}
                    </span>
                  </td>
                  <td>
                    <div className={styles.pageInfo}>
                      <span className={styles.pageTitle}>
                        {session.pageTitle || "No title"}
                      </span>
                      <span className={styles.pageUrl}>
                        {session.pageUrl?.split("/").pop() || "/"}
                      </span>
                    </div>
                  </td>
                </tr>
                {expandedRows.includes(session._id) && (
                  <tr>
                    <td colSpan="8" className={styles.expandedRow}>
                      {renderDetailedRow(session)}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsTabs;
