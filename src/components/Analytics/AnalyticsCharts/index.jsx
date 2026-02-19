import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import styles from "./AnalyticsCharts.module.css";

const COLORS = [
  "#FFD700",
  "#2196F3",
  "#4CAF50",
  "#FF9800",
  "#E91E63",
  "#9C27B0",
  "#00BCD4",
];

const AnalyticsCharts = ({
  getChartData,
  getDeviceData,
  getBrowserData,
  getOsData,
  getCountryData,
}) => {
  const [chartType, setChartType] = useState("visitors");

  const chartData = getChartData();
  const deviceData = getDeviceData();
  const browserData = getBrowserData();
  const osData = getOsData();
  const countryData = getCountryData();

  return (
    <div className={styles.chartsContainer}>
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Traffic Overview</h3>
          <div className={styles.chartControls}>
            <button
              className={`${styles.chartTypeButton} ${chartType === "visitors" ? styles.active : ""}`}
              onClick={() => setChartType("visitors")}
            >
              Visitors
            </button>
            <button
              className={`${styles.chartTypeButton} ${chartType === "pageviews" ? styles.active : ""}`}
              onClick={() => setChartType("pageviews")}
            >
              Page Views
            </button>
          </div>
        </div>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="time" stroke="var(--text-light)" />
              <YAxis stroke="var(--text-light)" />
              <Tooltip
                contentStyle={{
                  background: "var(--dark-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={chartType === "visitors" ? "visitors" : "pageviews"}
                stroke="#FFD700"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Devices</h3>
          <div className={styles.pieChartWrapper}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--dark-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.legendList}>
            {deviceData.slice(0, 5).map((item, index) => (
              <div key={item.name} className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ background: COLORS[index % COLORS.length] }}
                />
                <span className={styles.legendName}>{item.name}</span>
                <span className={styles.legendValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Top Countries</h3>
          <div className={styles.pieChartWrapper}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {countryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--dark-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.legendList}>
            {countryData.slice(0, 5).map((item, index) => (
              <div key={item.name} className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ background: COLORS[index % COLORS.length] }}
                />
                <span className={styles.legendName}>{item.name}</span>
                <span className={styles.legendValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
