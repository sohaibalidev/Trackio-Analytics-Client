import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Globe, LineChart, ChevronLeft, Menu } from "lucide-react";
import ThemeSwitcher from "../../ThemeSwitcher";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onToggleSidebar, collapsed }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={22} /> },
    { path: "/websites", label: "Websites", icon: <Globe size={22} /> },
    { path: "/analytics", label: "Analytics", icon: <LineChart size={22} /> },
  ];

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <nav className={styles.nav}>
        <div className={styles.menuContainer}>
          <button
            onClick={onToggleSidebar}
            className={styles.menuButton}
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <Menu size={22} />
            ) : (
              <ChevronLeft size={22} />
            )}
          </button>
        </div>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.path} className={styles.menuItem}>
              <Link
                to={item.path}
                className={`${styles.menuLink} ${location.pathname === item.path ? styles.active : ""
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

      {!collapsed && <ThemeSwitcher />}

      {!collapsed && (
        <div className={styles.footer}>
          <p className={styles.footerText}>Analytics Tool v1.0</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
