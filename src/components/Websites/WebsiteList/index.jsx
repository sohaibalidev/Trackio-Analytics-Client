import { Edit, Trash2, RefreshCw, Code } from "lucide-react";
import styles from "./WebsiteList.module.css";

const WebsiteList = ({
  websites,
  onEdit,
  onDelete,
  onRegenerateKey,
  onShowScript,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Your Websites</h3>
        <span className={styles.count}>
          {websites.length} {websites.length === 1 ? "website" : "websites"}
        </span>
      </div>

      {websites.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            No websites added yet. Create your first website to start tracking!
          </p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website) => (
              <tr key={website._id}>
                <td className={styles.nameCell}>
                  <div className={styles.name}>{website.name}</div>
                  <div className={styles.apiKey}>
                    API: {website.apiKey.substring(0, 12)}...
                  </div>
                </td>
                <td>
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.urlLink}
                  >
                    {website.url}
                  </a>
                </td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${website.isActive ? styles.statusActive : styles.statusInactive}`}
                  >
                    {website.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{new Date(website.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => onShowScript(website)}
                      className={styles.actionButton}
                      title="View script"
                    >
                      <Code size={16} className={styles.icon} />
                    </button>
                    <button
                      onClick={() => onRegenerateKey(website._id)}
                      className={styles.actionButton}
                      title="Regenerate API Key"
                    >
                      <RefreshCw size={16} className={styles.icon} />
                    </button>
                    <button
                      onClick={() => onEdit(website)}
                      className={styles.actionButton}
                      title="Edit"
                    >
                      <Edit size={16} className={styles.icon} />
                    </button>
                    <button
                      onClick={() => onDelete(website._id)}
                      className={`${styles.actionButton} ${styles.danger}`}
                      title="Delete"
                    >
                      <Trash2 size={16} className={styles.icon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WebsiteList;
