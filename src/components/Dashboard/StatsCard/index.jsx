import styles from "./StatsCard.module.css";

const StatsCard = ({ title, value, icon, color, change }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div
          className={styles.iconContainer}
          style={{ backgroundColor: `${color}20` }}
        >
          <span className={styles.icon} style={{ color }}>
            {icon}
          </span>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        {change !== undefined && (
          <div
            className={`${styles.change} ${change >= 0 ? styles.positive : styles.negative}`}
          >
            {change >= 0 ? "↗" : "↘"} {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
