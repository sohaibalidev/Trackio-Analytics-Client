import React from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import styles from "./AnalyticsTable.module.css";

const AnalyticsTable = ({
  analyticsData,
  expandedRows,
  toggleRowExpansion,
  formatDate,
  onDelete,
  formatDuration,
  getConnectionIcon,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Visitor ID</th>
            <th>Duration</th>
            <th>Page</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {analyticsData.analytics?.map((item) => (
            <React.Fragment key={item._id}>
              <tr className={styles.tableRow}>
                <td className={styles.timeCell}>
                  {formatDate(item.sessionStart)}
                </td>
                <td>
                  <span className={styles.visitorId} title={item.visitorId}>
                    {item.visitorId.substring(0, 10)}...
                  </span>
                </td>
                <td>
                  <span className={styles.duration}>
                    {formatDuration(item.sessionDuration)}
                  </span>
                </td>
                <td>
                  <div className={styles.pageInfo}>
                    <div className={styles.pageTitle}>{item.pageTitle}</div>
                    <div className={styles.pageUrl}>{item.pageUrl}</div>
                  </div>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.detailsButton}
                      onClick={() => toggleRowExpansion(item._id)}
                    >
                      {expandedRows.includes(item._id) ? (
                        <>
                          <ChevronUp size={14} />
                          Hide
                        </>
                      ) : (
                        <>
                          <ChevronDown size={14} />
                          Details
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(item.websiteId, item._id)}
                      className={`${styles.actionButton} ${styles.danger}`}
                      title="Delete"
                    >
                      <Trash2 size={16} className={styles.icon} />
                    </button>
                  </div>
                </td>
              </tr>

              {expandedRows.includes(item._id) && (
                <tr className={styles.expandedRow}>
                  <td colSpan="6">
                    <div className={styles.expandedContent}>
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          Technical Details
                        </h4>
                        <div className={styles.grid}>
                          <div className={styles.detail}>
                            <span className={styles.label}>
                              Screen Resolution
                            </span>
                            <span className={styles.value}>
                              {item.screenResolution?.width || 0} x{" "}
                              {item.screenResolution?.height || 0}
                            </span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.label}>Viewport Size</span>
                            <span className={styles.value}>
                              {item.viewportSize?.width || 0} x{" "}
                              {item.viewportSize?.height || 0}
                            </span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.label}>Network</span>
                            <span className={styles.value}>
                              {getConnectionIcon(
                                item.connection?.effectiveType,
                              )}{" "}
                              · {item.connection?.downlink || 0} Mbps
                            </span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.label}>Memory</span>
                            <span className={styles.value}>
                              {item.deviceMemory || 0} GB
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          System Information
                        </h4>
                        <div className={styles.grid}>
                          <div className={styles.detail}>
                            <span className={styles.label}>Browser</span>
                            <span className={styles.value}>
                              {item.browser} {item.browserVersion}
                            </span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.label}>OS</span>
                            <span className={styles.value}>
                              {item.os} {item.osVersion}
                            </span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.label}>Timezone</span>
                            <span className={styles.value}>
                              {item.timezone}
                            </span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.label}>Battery</span>
                            <span className={styles.value}>
                              {((item.batteryLevel || 0) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          Session Information
                        </h4>
                        <div className={styles.grid}>
                          <div className={styles.detail}>
                            <span className={styles.label}>IP Address</span>
                            <span className={styles.ipAddress}>
                              {item.ipAddress}
                            </span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.label}>Last Activity</span>
                            <span className={styles.value}>
                              {formatDate(item.lastActivity)}
                            </span>
                          </div>
                        </div>
                        <div className={styles.userAgent}>
                          <span className={styles.label}>User Agent</span>
                          <code>{item.userAgent}</code>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsTable;
