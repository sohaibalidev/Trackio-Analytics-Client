import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import { Check, Globe, MapPin, Monitor, Smartphone, Zap } from "lucide-react";
import LoginButton from "@/components/Auth/LoginButton";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Trackio Analytics</h1>
          <p className={styles.subtitle}>
            Track and analyze your website traffic with precision and clarity
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.features}>
            <h3>Powerful Features:</h3>
            <ul className={styles.featureList}>
              <li>
                <Check size={16} /> Real-time analytics tracking with instant
                updates
              </li>
              <li>
                <Monitor size={16} /> Advanced device and browser detection
              </li>
              <li>
                <Smartphone size={16} /> Detailed screen size and performance
                metrics
              </li>
              <li>
                <MapPin size={16} /> Precise visitor location tracking
              </li>
              <li>
                <Globe size={16} /> Multiple website management support
              </li>
              <li>
                <Zap size={16} /> Simple one-line script installation
              </li>
            </ul>
          </div>

          <div className={styles.loginSection}>
            <div className={styles.loginCard}>
              <h3 className={styles.loginTitle}>Start Your Journey</h3>
              <p className={styles.loginDescription}>
                Sign in with your Google account to unlock powerful analytics
                and insights for your websites
              </p>
              <LoginButton onClick={handleGoogleLogin} />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
