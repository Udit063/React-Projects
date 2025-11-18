import React from "react";

const FormNavigation = () => {
  const {
    currentStep,
    prevStep,
    nextStep,
    validateCurrentStep,
    submitForm,
    resetForm,
    formData,
    isSubmitted,
  } = useForm();

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    if (!formData.confirmation) {
      alert(
        "Please confirm that all information is accurate before submitting."
      );
      return;
    }
    const success = await submitForm();
    if (!success) {
      alert("Please fix errors before submitting.");
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? All data will be lost."
      )
    );
    resetForm();
  };

  if (isSubmitted) {
    return (
      <div className="form-navigation">
        <button type="button" onClick={resetForm} className="btn btn-primary">
          Start New Form
        </button>
      </div>
    );
  }

  return (
    <div className="form-navigation">
      <div className="nav-left">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="btn btn-secondary"
          >
            ← Previous
          </button>
        )}

        <button type="button" onClick={handleReset} className="btn btn-text">
          Reset Form
        </button>
      </div>
      <div className="nav-right">
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-primary"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-success"
            disabled={!formData.confirmation}
          >
            Submit Form
          </button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
