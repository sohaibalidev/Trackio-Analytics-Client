import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import styles from "./Layout.module.css";

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(JSON.parse(localStorage.getItem('isCollapsed')));

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    localStorage.setItem('isCollapsed', JSON.stringify(!sidebarCollapsed))
  };

  return (
    <div className={styles.appContainer}>
      <Header
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />
      <Sidebar onToggleSidebar={toggleSidebar} collapsed={sidebarCollapsed} />
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
