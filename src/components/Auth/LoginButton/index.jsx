import { Chrome } from "lucide-react";
import styles from "./LoginButton.module.css";

const LoginButton = ({ onClick, loading }) => {
  return (
    <button onClick={onClick} disabled={loading} className={styles.button}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Chrome size={20} className={styles.icon} />
          Sign in with Google
        </>
      )}
    </button>
  );
};

export default LoginButton;
