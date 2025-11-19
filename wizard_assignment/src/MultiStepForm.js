// src/MultiStepForm.js
import React, { useState, useEffect } from "react";
import { useForm } from "./context/FormContext";
import ProgressBar from "./components/ProgressBar";
import Step1Personal from "./components/Step1Personal";
import Step2Address from "./components/Step2Address";
import Step3Preferences from "./components/Step3Preferences";
import Step4Review from "./components/Step4Review";
import FormNavigation from "./components/FormNavigation";
import "./styles/MultiStepForm.css";
const MultiStepForm = () => {
  const {
    currentStep,
    isSubmitted,
    loading,
    formId,
    formTitle,
    formStatus,
    updateFormMetadata,
  } = useForm();

  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(formTitle);
  useEffect(() => {
    setNewTitle(formTitle);
  }, [formTitle]);
  const handleTitleUpdate = async () => {
    if (newTitle.trim() && newTitle !== formTitle) {
      await updateFormMetadata({ title: newTitle });
    }
    setEditingTitle(false);
  };
  const renderCurrentStep = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading form data from AWS DynamoDB...</p>
        </div>
      );
    }
    if (isSubmitted) {
      return <Step4Review />;
    }
    switch (currentStep) {
      case 1:
        return <Step1Personal />;
      case 2:
        return <Step2Address />;
      case 3:
        return <Step3Preferences />;
      case 4:
        return <Step4Review />;
      default:
        return <Step1Personal />;
    }
  };
  if (!formId) {
    return (
      <div className="no-form-selected">
        <h2>No Form Selected</h2>
        <p>Please select a form from the dashboard or create a new one.</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }
  return (
    <div className="multi-step-form">
      <div className="form-container">
        <header className="form-header">
          <div className="form-title-section">
            {editingTitle ? (
              <div className="title-edit">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={handleTitleUpdate}
                  onKeyPress={(e) => e.key === "Enter" && handleTitleUpdate()}
                  autoFocus
                  className="title-input"
                />
                <button onClick={handleTitleUpdate} className="title-savebtn">
                  ✓
                </button>
              </div>
            ) : (
              <div className="title-display">
                <h1 onClick={() => setEditingTitle(true)} title="Click to edit">
                  {formTitle}
                </h1>
                <button
                  onClick={() => setEditingTitle(true)}
                  className="edit-title-btn"
                  title="Edit title"
                >
                  ✎
                </button>
              </div>
            )}
            <div className="form-meta">
              <span className="form-id">ID: {formId}</span>
              <span className={`form-status ${formStatus}`}>
                {formStatus.charAt(0).toUpperCase() + formStatus.slice(1)}
              </span>
            </div>
          </div>
          <div className="cloud-status">
            <span className="status-indicator online"></span>
            AWS DynamoDB Connected - Auto-save Active
          </div>
        </header>
        {!isSubmitted && !loading && <ProgressBar />}
        <div className="form-content">{renderCurrentStep()}</div>
        {!isSubmitted && !loading && <FormNavigation />}
        <footer className="form-footer">
          <p>
            <strong>AWS DynamoDB CRUD Operations:</strong> Create, Read, Update,
            and Delete operations are fully integrated with real-time cloud
            persistence.
          </p>
        </footer>
      </div>
    </div>
  );
};
export default MultiStepForm;
