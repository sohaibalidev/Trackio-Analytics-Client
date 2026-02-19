import { useState } from "react";
import { useWebsites } from "@/hooks/useWebsites";
import { Plus } from "lucide-react";
import WebsiteForm from "@/components/Websites/WebsiteForm";
import WebsiteList from "@/components/Websites/WebsiteList";
import ScriptModal from "@/components/Websites/ScriptModal";
import ConfirmPopup from "@/components/Websites/ConfirmPopup";
import styles from "./Websites.module.css";

const Websites = () => {
  const {
    websites,
    loading,
    error,
    selectedWebsite,
    setSelectedWebsite,
    createWebsite,
    updateWebsite,
    deleteWebsite,
    clearAnalytics,
    regenerateApiKey,
  } = useWebsites();

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState(null);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    action: null,
    websiteId: null,
    title: "",
    message: "",
    confirmText: "",
  });

  const showConfirm = (action, id, title, message, confirmText = "Confirm") => {
    setConfirmState({
      isOpen: true,
      action,
      websiteId: id,
      title,
      message,
      confirmText,
    });
  };

  const handleConfirm = async () => {
    const { action, websiteId } = confirmState;

    try {
      if (action === "delete") {
        await deleteWebsite(websiteId);
      } else if (action === "regenerate") {
        await regenerateApiKey(websiteId);
      } else if (action === "clear") {
        await clearAnalytics(websiteId);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setConfirmState({ isOpen: false, action: null, websiteId: null });
    }
  };

  const handleClose = () => {
    setConfirmState({ isOpen: false, action: null, websiteId: null });
  };

  const handleDelete = (id) => {
    showConfirm(
      "delete",
      id,
      "Delete Website",
      "Are you sure you want to delete this website? All analytics data will be lost.",
      "Delete",
    );
  };

  const handleClearAnalytics = (id) => {
    showConfirm(
      "clear",
      id,
      "Clear Analytics",
      "Are you sure you want to clear analytics of this website?",
      "Clear",
    );
  };

  const handleRegenerateKey = (id) => {
    showConfirm(
      "regenerate",
      id,
      "Regenerate API Key",
      "Are you sure you want to regenerate the API key? The old script will stop working.",
      "Regenerate",
    );
  };

  const handleCreate = async (websiteData) => {
    await createWebsite(websiteData);
    setShowFormModal(false);
  };

  const handleUpdate = async (websiteData) => {
    if (editingWebsite) {
      await updateWebsite(editingWebsite._id, websiteData);
      setEditingWebsite(null);
      setShowFormModal(false);
    }
  };

  const handleShowScript = (website) => {
    setSelectedWebsite(website);
    setShowScriptModal(true);
  };

  const handleEditWebsite = (website) => {
    setEditingWebsite(website);
    setShowFormModal(true);
  };

  const handleAddWebsite = () => {
    setEditingWebsite(null);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingWebsite(null);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorCard}>
        <div className={styles.errorText}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Manage Websites</h2>
        <button onClick={handleAddWebsite} className={styles.addButton}>
          <Plus size={18} />
          Add Website
        </button>
      </div>

      <WebsiteList
        websites={websites}
        onEdit={handleEditWebsite}
        onDelete={(websiteId) => handleDelete(websiteId)}
        onClear={(websiteId) => handleClearAnalytics(websiteId)}
        onRegenerateKey={(websiteId) => handleRegenerateKey(websiteId)}
        onShowScript={handleShowScript}
      />

      {showFormModal && (
        <div className={styles.modalOverlay} onClick={handleCloseFormModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingWebsite ? "Edit Website" : "Add New Website"}
              </h3>
              <button
                onClick={handleCloseFormModal}
                className={styles.modalCloseButton}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <WebsiteForm
                onSubmit={editingWebsite ? handleUpdate : handleCreate}
                initialData={editingWebsite}
                submitText={
                  editingWebsite ? "Update Website" : "Create Website"
                }
              />
            </div>
          </div>
        </div>
      )}

      {showScriptModal && selectedWebsite && (
        <ScriptModal
          website={selectedWebsite}
          onClose={() => {
            setShowScriptModal(false);
            setSelectedWebsite(null);
          }}
        />
      )}

      <ConfirmPopup
        isOpen={confirmState.isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText="Cancel"
      />
    </div>
  );
};

export default Websites;
