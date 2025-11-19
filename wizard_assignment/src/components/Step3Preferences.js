// src/components/Step3Preferences.js
import React from "react";
import { useForm } from "../context/FormContext";
const Step3Preferences = () => {
  const { formData, updateFormData } = useForm();
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };
  const handleCheckboxChange = (field, checked) => {
    updateFormData({ [field]: checked });
  };
  return (
    <div className="form-step">
      <h2>Communication Preferences</h2>
      <p className="step-description">
        Tell us how you'd like to stay informed. All options are optional.
      </p>
      <div className="preferences-section">
        <h3>Email Notifications</h3>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.newsletter || false}
              onChange={(e) =>
                handleCheckboxChange("newsletter", e.target.checked)
              }
            />
            <span className="checkmark"></span>
            Subscribe to our newsletter
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.promotional || false}
              onChange={(e) =>
                handleCheckboxChange("promotional", e.target.checked)
              }
            />
            <span className="checkmark"></span>
            Receive promotional offers
          </label>
        </div>
      </div>
      <div className="preferences-section">
        <h3>Contact Frequency</h3>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="contactFrequency"
              value="weekly"
              checked={formData.contactFrequency === "weekly"}
              onChange={(e) => handleChange("contactFrequency", e.target.value)}
            />
            <span className="radiomark"></span>
            Weekly updates
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="contactFrequency"
              value="monthly"
              checked={formData.contactFrequency === "monthly"}
              onChange={(e) => handleChange("contactFrequency", e.target.value)}
            />
            <span className="radiomark"></span>
            Monthly updates
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="contactFrequency"
              value="never"
              checked={formData.contactFrequency === "never"}
              onChange={(e) => handleChange("contactFrequency", e.target.value)}
            />
            <span className="radiomark"></span>
            Only important updates
          </label>
        </div>
      </div>
    </div>
  );
};
export default Step3Preferences;
