import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./DeviceChart.module.css";

const DeviceChart = ({ data, title = "test" }) => {
  const COLORS = [
    "var(--primary-accent)",
    "var(--success)",
    "var(--warning-color, #ff9800)",
    "var(--error)",
    "var(--secondary-color, #9c27b0)",
  ];

  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>No device data available</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p style={{ margin: 0, color: "var(--text)" }}>
            {payload[0].name}: <strong>{payload[0].value}</strong> visits
          </p>
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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="var(--primary-accent)"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeviceChart;
