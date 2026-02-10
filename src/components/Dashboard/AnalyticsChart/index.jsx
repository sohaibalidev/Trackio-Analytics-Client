import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import styles from "./AnalyticsChart.module.css";

const AnalyticsChart = ({ data, title, showArea = false }) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          No data available for the selected period
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p
            style={{
              margin: "0 0 8px 0",
              color: "var(--text-light)",
              fontSize: "12px",
            }}
          >
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: "4px 0", color: "var(--text)" }}>
              <span style={{ color: entry.color, marginRight: "8px" }}>●</span>
              {entry.name}: <strong>{entry.value}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          {showArea ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="var(--primary-accent)"
                fill="var(--primary-accent)"
                fillOpacity={0.1}
                strokeWidth={2}
                name="Visitors"
              />
              <Area
                type="monotone"
                dataKey="pageviews"
                stroke="var(--success)"
                fill="var(--success)"
                fillOpacity={0.1}
                strokeWidth={2}
                name="Page Views"
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="var(--primary-accent)"
                strokeWidth={2}
                dot={{ stroke: "var(--primary-accent)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Visitors"
              />
              <Line
                type="monotone"
                dataKey="pageviews"
                stroke="var(--success)"
                strokeWidth={2}
                dot={{ stroke: "var(--success)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Page Views"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
