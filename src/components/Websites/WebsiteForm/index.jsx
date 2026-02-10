import { useState } from "react";
import styles from "./WebsiteForm.module.css";

const WebsiteForm = ({
  onSubmit,
  initialData,
  submitText = "Create Website",
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    url: initialData?.url || "",
    isActive: initialData?.isActive ?? true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Website name is required";
    }

    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    } else {
      try {
        new URL(formData.url);
      } catch (error) {
        newErrors.url = "Please enter a valid URL";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({ name: "", url: "", isActive: true });
      }
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Website Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter website name"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="url" className={styles.label}>
          Website URL
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://example.com"
        />
        {errors.url && <span className={styles.error}>{errors.url}</span>}
      </div>

      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className={styles.checkbox}
        />
        <label htmlFor="isActive" className={styles.checkboxLabel}>
          Active Tracking
        </label>
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Processing..." : submitText}
      </button>
    </form>
  );
};

export default WebsiteForm;
