import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Callback.module.css";

const Callback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    login()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [login, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>Signing you in...</p>
      </div>
    </div>
  );
};

export default Callback;
