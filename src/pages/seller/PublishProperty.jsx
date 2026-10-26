import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSeller } from "../../Content/SellerContext";
import "./PublishProperty.css";

const INITIAL_FORM = {
  title: "",
  type: "",
  listingType: "rent",   // "rent" | "sale"
  rent: "",
  salePrice: "",
  securityDeposit: "",
  description: "",
  image: "",
  city: "",
  location: "",
  address: "",
  landmark: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  furnishing: "",
  floor: "",
};

function PublishProperty({ editData = null, onEditDone = null }) {
  const navigate = useNavigate();
  const { addProperty, updateProperty } = useSeller();

  const isEdit = !!editData;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(
    editData
      ? { ...INITIAL_FORM, ...editData }
      : INITIAL_FORM
  );
  const [imagePreview, setImagePreview] = useState(editData?.image || "");
  const [errors, setErrors] = useState({});

  const isRent = formData.listingType === "rent";

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleListingTypeChange(type) {
    setFormData((prev) => ({ ...prev, listingType: type }));
    setErrors((prev) => ({ ...prev, rent: "", salePrice: "" }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function validateStep1() {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Property title is required.";
    if (!formData.type) newErrors.type = "Property type is required.";
    if (isRent && !formData.rent) newErrors.rent = "Monthly rent is required.";
    if (!isRent && !formData.salePrice) newErrors.salePrice = "Sale price is required.";
    return newErrors;
  }

  function validateStep2() {
    const newErrors = {};
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.location.trim()) newErrors.location = "Area / Locality is required.";
    return newErrors;
  }

  function handleNext() {
    let newErrors = {};
    if (step === 1) newErrors = validateStep1();
    if (step === 2) newErrors = validateStep2();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  function handleSaveDraft() {
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      setStep(1);
      return;
    }

    if (isEdit) {
      updateProperty(editData.id, { ...formData, status: "Draft" });
      if (onEditDone) onEditDone();
    } else {
      addProperty({ ...formData, status: "Draft" });
    }
    navigate("/seller/properties");
  }

  function handlePublish() {
    const step1Errors = validateStep1();
    const step2Errors = validateStep2();
    const allErrors = { ...step1Errors, ...step2Errors };
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      if (Object.keys(step1Errors).length > 0) setStep(1);
      else if (Object.keys(step2Errors).length > 0) setStep(2);
      return;
    }

    if (isEdit) {
      updateProperty(editData.id, { ...formData, status: "Published" });
      if (onEditDone) onEditDone();
    } else {
      addProperty({ ...formData, status: "Published" });
    }
    navigate("/seller/properties");
  }

  function handleCancel() {
    if (onEditDone) {
      onEditDone();
    } else {
      navigate("/seller/dashboard");
    }
  }

  const steps = [
    { num: 1, label: "Basic Information" },
    { num: 2, label: "Photos & Location" },
    { num: 3, label: "Property Details" },
  ];

  return (
    <section className="publish-property">

      <div className="publish-header">
        <h1>{isEdit ? "Edit Property" : "Publish Property"}</h1>
        <p>
          {isEdit
            ? "Update your property details below."
            : "Fill in your property details and publish your listing."}
        </p>
      </div>


      {/* Step Progress Indicator */}
      <div className="step-progress">
        {steps.map((s, idx) => (
          <div key={s.num} className="step-progress-item">
            <div
              className={`step-circle ${
                step === s.num
                  ? "step-active"
                  : step > s.num
                  ? "step-done"
                  : ""
              }`}
            >
              {step > s.num ? "✓" : s.num}
            </div>
            <span
              className={`step-label ${
                step === s.num ? "step-label-active" : ""
              }`}
            >
              {s.label}
            </span>
            {idx < steps.length - 1 && (
              <div className={`step-line ${step > s.num ? "step-line-done" : ""}`} />
            )}
          </div>
        ))}
      </div>


      {/* ===== STEP 1: Basic Information ===== */}
      {step === 1 && (
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">

            <div className="form-group full">
              <label>Property Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Spacious 2BHK Apartment in Model Town"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "input-error" : ""}
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>Property Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={errors.type ? "input-error" : ""}
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="PG">PG</option>
                <option value="Studio">Studio</option>
              </select>
              {errors.type && <span className="field-error">{errors.type}</span>}
            </div>

            {/* Listing Type Toggle */}
            <div className="form-group">
              <label>Listing Type *</label>
              <div className="listing-type-toggle">
                <button
                  type="button"
                  className={`listing-type-btn${formData.listingType === "rent" ? " listing-type-active" : ""}`}
                  onClick={() => handleListingTypeChange("rent")}
                >
                  🏠 For Rent
                </button>
                <button
                  type="button"
                  className={`listing-type-btn${formData.listingType === "sale" ? " listing-type-active listing-type-sale" : ""}`}
                  onClick={() => handleListingTypeChange("sale")}
                >
                  🏷️ For Sale
                </button>
              </div>
            </div>

            {/* Conditional Price Field */}
            {isRent ? (
              <div className="form-group">
                <label>Monthly Rent (₹) *</label>
                <input
                  type="number"
                  name="rent"
                  placeholder="e.g. 15000"
                  value={formData.rent}
                  onChange={handleChange}
                  className={errors.rent ? "input-error" : ""}
                />
                {errors.rent && <span className="field-error">{errors.rent}</span>}
              </div>
            ) : (
              <div className="form-group">
                <label>Sale Price (₹) *</label>
                <input
                  type="number"
                  name="salePrice"
                  placeholder="e.g. 8500000"
                  value={formData.salePrice}
                  onChange={handleChange}
                  className={errors.salePrice ? "input-error" : ""}
                />
                {errors.salePrice && <span className="field-error">{errors.salePrice}</span>}
              </div>
            )}

            {isRent && (
              <div className="form-group">
                <label>Security Deposit (₹)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  placeholder="e.g. 30000"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group full">
              <label>Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Describe your property — amenities, surroundings, highlights..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>
      )}


      {/* ===== STEP 2: Photos & Location ===== */}
      {step === 2 && (
        <div className="form-section">
          <h2>Photos &amp; Location</h2>
          <div className="form-grid">

            <div className="form-group full">
              <label>Property Image</label>
              <div className="image-upload-area">
                {imagePreview ? (
                  <div className="image-preview-wrap">
                    <img
                      src={imagePreview}
                      alt="Property Preview"
                      className="image-preview"
                    />
                    <label className="change-image-btn" htmlFor="property-image-input">
                      🔄 Change Image
                    </label>
                  </div>
                ) : (
                  <label className="image-upload-placeholder" htmlFor="property-image-input">
                    <span className="upload-icon">📷</span>
                    <span>Click to upload a property image</span>
                    <span className="upload-hint">JPG, PNG, WEBP supported</span>
                  </label>
                )}
                <input
                  id="property-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Ludhiana"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "input-error" : ""}
              />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label>Area / Locality *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Model Town"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? "input-error" : ""}
              />
              {errors.location && <span className="field-error">{errors.location}</span>}
            </div>

            <div className="form-group full">
              <label>Full Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street, House No., etc."
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label>Nearby Landmark</label>
              <input
                type="text"
                name="landmark"
                placeholder="e.g. Near Civil Hospital"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>
      )}


      {/* ===== STEP 3: Property Details ===== */}
      {step === 3 && (
        <div className="form-section">
          <h2>Property Details</h2>
          <div className="form-grid">

            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                placeholder="e.g. 2"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                placeholder="e.g. 2"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Area (sq.ft)</label>
              <input
                type="number"
                name="area"
                placeholder="e.g. 1200"
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Floor</label>
              <input
                type="text"
                name="floor"
                placeholder="e.g. 3rd Floor"
                value={formData.floor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label>Furnishing</label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
              >
                <option value="">Select Furnishing</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

          </div>
        </div>
      )}


      {/* Navigation Buttons */}
      <div className="form-actions">

        <button
          type="button"
          className="btn-cancel"
          onClick={handleCancel}
        >
          {isEdit ? "← Cancel" : "Cancel"}
        </button>

        <div className="form-actions-right">

          {step > 1 && (
            <button
              type="button"
              className="btn-back"
              onClick={handleBack}
            >
              ← Back
            </button>
          )}

          {step < 3 && (
            <button
              type="button"
              className="btn-next"
              onClick={handleNext}
            >
              Next →
            </button>
          )}

          {step === 3 && (
            <>
              <button
                type="button"
                className="btn-draft"
                onClick={handleSaveDraft}
              >
                💾 Save as Draft
              </button>

              <button
                type="button"
                className="btn-publish"
                onClick={handlePublish}
              >
                🚀 {isEdit ? "Save Changes" : "Publish Property"}
              </button>
            </>
          )}

        </div>

      </div>

    </section>
  );
}

export default PublishProperty;