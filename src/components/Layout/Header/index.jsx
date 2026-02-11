import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import styles from "./Header.module.css";

const Header = ({ onToggleSidebar, sidebarCollapsed }) => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button
          onClick={onToggleSidebar}
          className={styles.menuButton}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        <h1 className={styles.logo}>Trackio Analytics</h1>
      </div>

      <div className={styles.rightSection}>
        {user && (
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.avatarImage}
                />
              ) : (
                <span className={styles.avatarFallback}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
