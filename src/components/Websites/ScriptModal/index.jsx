import { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import styles from "./ScriptModal.module.css";

const ScriptModal = ({ website, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(website.scriptTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Tracking Script for {website.name}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.instructions}>
          <p>
            Copy and paste this script tag into your website's HTML, just before
            the closing <code>&lt;/head&gt;</code> tag:
          </p>
        </div>

        <div className={styles.codeContainer}>
          <div className={styles.codeHeader}>
            <span>Script Tag</span>
            <button onClick={copyScript} className={styles.copyButton}>
              {copied ? (
                <>
                  <Check size={14} className={styles.copyIcon} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} className={styles.copyIcon} />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className={styles.code}>
            <code>{website.scriptTag}</code>
          </pre>
        </div>

        <div className={styles.steps}>
          <h4>Installation Steps:</h4>
          <ol className={styles.stepsList}>
            <li>Copy the script tag above</li>
            <li>
              Paste it into your website's HTML, before the closing{" "}
              <code>&lt;/head&gt;</code> tag
            </li>
            <li>Save and deploy your website</li>
            <li>Verify installation by visiting your website</li>
            <li>Check analytics data in your dashboard</li>
          </ol>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.doneButton}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScriptModal;
