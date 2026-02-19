import {
  ChevronDown,
  ChevronRight,
  MapPin,
  Cpu,
  Wifi,
  Battery,
  Globe,
  Clock,
  Monitor,
  Smartphone,
  Laptop,
  Trash2,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";
import styles from "./AnalyticsTabs.module.css";

const AnalyticsTabs = ({
  analyticsData,
  expandedRows,
  onDelete,
  toggleRowExpansion,
  formatDate,
  formatDuration,
  formatBattery,
}) => {
  const { analytics = [] } = analyticsData;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");

  const getDeviceIcon = (device) => {
    if (device?.toLowerCase().includes("mobile"))
      return (
        <div title="Mobile">
          {" "}
          <Smartphone size={14} />
        </div>
      );
    if (device?.toLowerCase().includes("tablet"))
      return (
        <div title="Tablet">
          {" "}
          <Monitor size={14} />
        </div>
      );
    return (
      <div title="Desktop">
        {" "}
        <Laptop size={14} />
      </div>
    );
  };

  const searchInSession = (session, term, filter) => {
    if (!term.trim()) return true;

    const searchLower = term.toLowerCase();
    const searchableFields = {
      timestamp: formatDate(session.timestamp)?.toLowerCase() || "",
      ipAddress: session.ipAddress?.toLowerCase() || "",
      visitorId: session.visitorId?.toLowerCase() || "",
      sessionId: session.sessionId?.toLowerCase() || "",
      country: session.country?.toLowerCase() || "",
      city: session.city?.toLowerCase() || "",
      region: session.region?.toLowerCase() || "",
      timezone: session.timezone?.toLowerCase() || "",
      isp: session.isp?.toLowerCase() || "",
      os: session.os?.toLowerCase() || "",
      osVersion: session.osVersion?.toLowerCase() || "",
      device: session.device?.toLowerCase() || "",
      gpu: session.gpu?.toLowerCase() || "",
      userAgent: session.userAgent?.toLowerCase() || "",
      speed: session.speed?.toString() || "",
      batteryLevel: session.batteryLevel?.toString() || "",
      referrer: session.referrer?.toLowerCase() || "",
      pageUrl: session.pageUrl?.toLowerCase() || "",
      pageTitle: session.pageTitle?.toLowerCase() || "",
      sessionStart: formatDate(session.sessionStart)?.toLowerCase() || "",
      lastActivity: formatDate(session.lastActivity)?.toLowerCase() || "",
      sessionDuration:
        formatDuration(session.sessionDuration)?.toLowerCase() || "",
    };

    if (filter === "all") {
      return Object.values(searchableFields).some((field) =>
        field.includes(searchLower),
      );
    } else {
      return searchableFields[filter]?.includes(searchLower) || false;
    }
  };

  const filteredAnalytics = analytics.filter((session) =>
    searchInSession(session, searchTerm, searchFilter),
  );

  const renderDetailedRow = (session) => (
    <div className={styles.expandedContent}>
      <div className={styles.detailSection}>
        <div className={styles.detailSectionTitle}>
          <Globe size={14} />
          <span>Session Information</span>
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Session ID</span>
            <span className={styles.detailValue}>{session.sessionId}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Visitor ID</span>
            <span className={styles.detailValue}>{session.visitorId}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Started</span>
            <span className={styles.detailValue}>
              {formatDate(session.sessionStart)}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Last Activity</span>
            <span className={styles.detailValue}>
              {formatDate(session.lastActivity)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.detailSection}>
        <div className={styles.detailSectionTitle}>
          <MapPin size={14} />
          <span>Location & Network</span>
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>IP Address</span>
            <span className={styles.detailValue}>{session.ipAddress}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Location</span>
            <span className={styles.detailValue}>
              {[session.city, session.region, session.country]
                .filter(Boolean)
                .join(", ") || "N/A"}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Timezone</span>
            <span className={styles.detailValue}>
              {session.timezone || "N/A"}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>ISP</span>
            <span className={styles.detailValue}>{session.isp || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className={styles.detailSection}>
        <div className={styles.detailSectionTitle}>
          <Cpu size={14} />
          <span>System Information</span>
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>OS</span>
            <span className={styles.detailValue}>
              {session.os} {session.osVersion || ""}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Device</span>
            <span className={styles.detailValue}>{session.device}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Screen</span>
            <span className={styles.detailValue}>
              {session.screenResolution?.width} x{" "}
              {session.screenResolution?.height}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>GPU</span>
            <span className={styles.detailValue}>{session.gpu || "N/A"}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>User Agent</span>
            <span className={styles.detailValue}>{session.userAgent}</span>
          </div>
        </div>
      </div>

      <div className={styles.detailSection}>
        <div className={styles.detailSectionTitle}>
          <Wifi size={14} />
          <span>Connection & Battery</span>
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Speed</span>
            <span className={styles.detailValue}>
              {session.speed ? `${session.speed} Mbps` : "N/A"}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Battery</span>
            <span className={styles.detailValue}>
              {formatBattery(session.batteryLevel, session.batteryCharging)}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Referrer</span>
            <span className={styles.detailValue}>
              {session.referrer || "Direct"}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Page URL</span>
            <span className={styles.detailValue}>{session.pageUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Session Details</h3>
        <span className={styles.count}>
          {filteredAnalytics.length} sessions
        </span>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search across all fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterWrapper}>
            <Filter style={{ color: "white" }} className={styles.filterIcon} />
            <select
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Fields</option>
              <option value="timestamp">Timestamp</option>
              <option value="ipAddress">IP Address</option>
              <option value="visitorId">Visitor ID</option>
              <option value="sessionId">Session ID</option>
              <option value="country">Country</option>
              <option value="city">City</option>
              <option value="region">Region</option>
              <option value="timezone">Timezone</option>
              <option value="isp">ISP</option>
              <option value="os">OS</option>
              <option value="device">Device</option>
              <option value="gpu">GPU</option>
              <option value="speed">Speed</option>
              <option value="batteryLevel">Battery</option>
              <option value="referrer">Referrer</option>
              <option value="pageUrl">Page URL</option>
              <option value="pageTitle">Page Title</option>
              <option value="sessionStart">Session Start</option>
              <option value="lastActivity">Last Activity</option>
              <option value="sessionDuration">Duration</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {filteredAnalytics.map((session) => (
          <div key={session._id} className={styles.sessionCard}>
            <div
              className={styles.sessionHeader}
              onClick={() => toggleRowExpansion(session._id)}
            >
              <div
                className={styles.expandIcon}
                title={
                  expandedRows.includes(session._id) ? "Collapse" : "Expand"
                }
              >
                {expandedRows.includes(session._id) ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </div>

              <div className={styles.visitorBadge}>
                {getDeviceIcon(session.device)}
                <span
                  className={styles.visitorShortId}
                  title={session.visitorId}
                >
                  {session.visitorId?.slice(0, 8)}
                </span>
              </div>

              <div className={styles.sessionMeta}>
                <div className={styles.timeInfo}>
                  <Clock size={12} />
                  <span>{formatDate(session.timestamp)}</span>
                </div>
                <div className={styles.locationInfo}>
                  <MapPin size={12} />
                  <span>
                    {session.country || "Unknown"}
                    {session.city ? `, ${session.city}` : ""}
                  </span>
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Device</span>
                  <span className={styles.statValue}>
                    {session.device || "N/A"}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>OS</span>
                  <span className={styles.statValue}>
                    {session.os || "N/A"}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Duration</span>
                  <span className={styles.statValue}>
                    {formatDuration(session.sessionDuration)}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Speed</span>
                  <span className={styles.statValue}>
                    {session.speed ? `${session.speed}Mbps` : "N/A"}
                  </span>
                </div>
              </div>

              <div className={styles.pageInfo}>
                <span className={styles.pageTitle}>
                  {session.pageTitle || "Untitled"}
                </span>
                <span className={styles.pageUrl} title={session.pageUrl}>
                  {session.pageUrl?.split("/").pop() || "/"}
                </span>
              </div>

              {session.batteryLevel !== undefined && (
                <div
                  className={`${styles.batteryIndicator} ${session.batteryCharging ? styles.charging : ""}`}
                  title={`${Math.round(session.batteryLevel * 100)}%${session.batteryCharging ? " - Charging" : ""}`}
                >
                  <Battery size={16} />
                  <span>{Math.round(session.batteryLevel * 100)}%</span>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(session.websiteId, session._id);
                }}
                className={`${styles.actionButton} ${styles.danger}`}
                title="Delete View"
              >
                <Trash2 size={16} className={styles.icon} />
              </button>
            </div>

            {expandedRows.includes(session._id) && (
              <div className={styles.expandedSection}>
                {renderDetailedRow(session)}
              </div>
            )}
          </div>
        ))}

        {filteredAnalytics.length === 0 && (
          <div className={styles.emptyState}>
            <p>No sessions match your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsTabs;
