import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./WebsiteCard.module.css";

const WebsiteCard = ({ website, onShowScript }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallScreen(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const truncateUrl = (url, maxLength) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{website.name}</h3>
          <span
            className={`${styles.statusBadge} ${!website.isActive ? styles.inactive : ""}`}
          >
            {website.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoRow}>
            <span className={styles.label}>URL:</span>
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {isMobile && !isSmallScreen
                ? truncateUrl(website.url, 40)
                : isSmallScreen
                  ? truncateUrl(website.url, 25)
                  : website.url}
              <ExternalLink size={16} className={styles.linkIcon} />
            </a>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Created:</span>
            <span className={styles.date}>
              {new Date(website.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>API Key:</span>
            <div className={styles.apiKeyContainer}>
              <code className={styles.apiKey}>
                {isSmallScreen
                  ? `${website.apiKey.substring(0, 6)}...`
                  : `${website.apiKey.substring(0, 8)}...`}
              </code>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => onShowScript(website)}
            className={styles.actionButton}
            title="View integration script"
          >
            {isSmallScreen ? "Script" : "View Script"}
          </button>
          <Link
            to={`/analytics?website=${website._id}`}
            className={`${styles.actionButton} ${styles.primary}`}
            title="View analytics dashboard"
          >
            {isSmallScreen ? "Analytics" : "View Analytics"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCard;
