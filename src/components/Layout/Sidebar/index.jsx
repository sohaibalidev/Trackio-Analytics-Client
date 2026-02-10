import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Globe, LineChart } from "lucide-react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/websites", label: "Websites", icon: <Globe size={20} /> },
    { path: "/analytics", label: "Analytics", icon: <LineChart size={20} /> },
  ];

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.path} className={styles.menuItem}>
              <Link
                to={item.path}
                className={`${styles.menuLink} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                {!collapsed && (
                  <span className={styles.menuLabel}>{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className={styles.footer}>
          <p className={styles.footerText}>Analytics Tool v1.0</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
