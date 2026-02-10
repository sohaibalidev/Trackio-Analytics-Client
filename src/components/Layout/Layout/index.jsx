import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import styles from "./layout.module.css";

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={styles.appContainer}>
      <Header
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />
      <Sidebar collapsed={sidebarCollapsed} />
      <main
        className={`${styles.mainContent} ${sidebarCollapsed ? styles.collapsed : ""}`}
      >
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
