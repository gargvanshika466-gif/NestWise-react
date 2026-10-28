import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ListProperty.css";

const AMENITIES_LIST = [
  "Power backup",
  "Lift",
  "Covered parking",
  "24×7 security",
  "Gym",
  "Swimming pool",
  "Balcony",
  "Pet friendly",
  "Play area",
];

function ListProperty() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form state across all 3 steps matching reference images
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: "",
    listingType: "rent", // "rent" or "sale"
    rent: "",
    securityDeposit: "",
    propertyType: "Apartment",
    description: "",

    // Step 2: Photos & Location (Pre-populated with demo data matching reference images)
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    city: "mumbai",
    locality: "gandhi chowk",
    address: "12th",

    // Step 3: Property details (Pre-populated with demo data matching reference images)
    bedrooms: "3",
    bathrooms: "2",
    areaSqft: "1450",
    furnishing: "Semi-furnished",
    amenities: [],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = 6 - formData.photos.length;
    if (remainingSlots <= 0) return;

    const toProcess = files.slice(0, remainingSlots);

    toProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => {
          if (prev.photos.length >= 6) return prev;
          return {
            ...prev,
            photos: [...prev.photos, uploadEvent.target.result],
          };
        });
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleRemovePhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="lp-page">

      {/* ── NAVBAR (Matches Reference Image) ── */}
      <nav className="lp-navbar">
        <Link to="/" className="lp-logo">
          <span className="lp-logo-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" />
              <path d="M9 21V12h6v9" />
            </svg>
          </span>
          NestWise
        </Link>

        <div className="lp-nav-actions">
          <Link to="/results" className="lp-nav-link">
            Browse homes
          </Link>
          <Link to="/login" className="lp-nav-btn-pill">
            Log in
          </Link>
          <Link to="/signup" className="lp-nav-btn-pill">
            Register
          </Link>
          <Link to="/list-property" className="lp-nav-btn-outline">
            List Property
          </Link>
          <button
            type="button"
            className="lp-nav-btn-download"
            onClick={() => alert("NestWise mobile app coming soon!")}
          >
            Download App
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="lp-main">

        {/* ── HEADER ── */}
        <header className="lp-hero">
          <p className="lp-eyebrow">FOR OWNERS</p>
          <h1 className="lp-title">
            List your <span className="lp-highlight">property</span>
          </h1>
          <p className="lp-subtitle">
            Three short steps and your home goes live on NestWise — seen by renters
            and buyers across India.
          </p>
        </header>

        {/* ── STEPPER PROGRESS BAR ── */}
        <div className="lp-stepper">
          <div className={`lp-step-item ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}>
            <div className="lp-step-circle">{step > 1 ? "✓" : "1"}</div>
            <span className="lp-step-label">Basic information</span>
          </div>

          <div className={`lp-step-line ${step > 1 ? "active" : ""}`} />

          <div className={`lp-step-item ${step === 2 ? "active" : step > 2 ? "completed" : ""}`}>
            <div className="lp-step-circle">{step > 2 ? "✓" : "2"}</div>
            <span className="lp-step-label">Photos & location</span>
          </div>

          <div className={`lp-step-line ${step > 2 ? "active" : ""}`} />

          <div className={`lp-step-item ${step === 3 ? "active" : step > 3 ? "completed" : ""}`}>
            <div className="lp-step-circle">{step > 3 ? "✓" : "3"}</div>
            <span className="lp-step-label">Property details</span>
          </div>
        </div>

        {/* ── STEP 1: BASIC INFORMATION (Matching Reference Images) ── */}
        {step === 1 && (
          <div className="lp-card">
            <h2 className="lp-card-title">Basic information</h2>

            <form onSubmit={handleNext}>
              {/* Property Title */}
              <div className="lp-form-group">
                <label className="lp-form-label" htmlFor="lp-title-input">
                  Property title
                </label>
                <input
                  id="lp-title-input"
                  className="lp-input"
                  type="text"
                  placeholder="e.g. Spacious 3BHK in Indiranagar"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              {/* Listing Type Capsule Toggle */}
              <div className="lp-form-group">
                <label className="lp-form-label">Listing type</label>
                <div className="lp-type-capsule">
                  <button
                    type="button"
                    className={`lp-capsule-btn ${formData.listingType === "rent" ? "active" : ""}`}
                    onClick={() => handleChange("listingType", "rent")}
                  >
                    For rent
                  </button>
                  <button
                    type="button"
                    className={`lp-capsule-btn ${formData.listingType === "sale" ? "active" : ""}`}
                    onClick={() => handleChange("listingType", "sale")}
                  >
                    For sale
                  </button>
                </div>
              </div>

              {/* Two-Column Row: Monthly Rent & Security Deposit */}
              <div className="lp-row-2col">
                <div className="lp-form-group" style={{ marginBottom: 0 }}>
                  <label className="lp-form-label" htmlFor="lp-rent-input">
                    {formData.listingType === "rent" ? "Monthly rent (₹)" : "Expected price (₹)"}
                  </label>
                  <input
                    id="lp-rent-input"
                    className="lp-input"
                    type="number"
                    placeholder="e.g. 40000"
                    value={formData.rent}
                    onChange={(e) => handleChange("rent", e.target.value)}
                    required
                  />
                </div>

                <div className="lp-form-group" style={{ marginBottom: 0 }}>
                  <div className="lp-label-row">
                    <label className="lp-form-label" htmlFor="lp-deposit-input" style={{ marginBottom: 0 }}>
                      Security deposit (₹)
                    </label>
                    <span className="lp-optional-tag">Optional</span>
                  </div>
                  <input
                    id="lp-deposit-input"
                    className="lp-input"
                    type="number"
                    placeholder="e.g. 5000"
                    value={formData.securityDeposit}
                    onChange={(e) => handleChange("securityDeposit", e.target.value)}
                  />
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="lp-form-group">
                <label className="lp-form-label" htmlFor="lp-type-select">
                  Property type
                </label>
                <div className="lp-select-wrap">
                  <select
                    id="lp-type-select"
                    className="lp-select"
                    value={formData.propertyType}
                    onChange={(e) => handleChange("propertyType", e.target.value)}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Villa">Villa</option>
                    <option value="PG">PG / Shared</option>
                    <option value="Studio">Studio</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Room">Room</option>
                  </select>
                  <span className="lp-select-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="lp-form-group">
                <div className="lp-label-row">
                  <label className="lp-form-label" htmlFor="lp-desc-input" style={{ marginBottom: 0 }}>
                    Description
                  </label>
                  <span className="lp-optional-tag">Optional</span>
                </div>
                <textarea
                  id="lp-desc-input"
                  className="lp-textarea"
                  placeholder="Describe your property..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              {/* Actions: Continue button */}
              <div className="lp-card-actions">
                <button type="submit" className="lp-btn-continue">
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── STEP 2: PHOTOS & LOCATION (Matches Reference Images 1 & 2) ── */}
        {step === 2 && (
          <div className="lp-card">
            <h2 className="lp-card-title">Photos & location</h2>

            <form onSubmit={handleNext}>
              {/* Photos Group */}
              <div className="lp-form-group">
                <div className="lp-label-row">
                  <label className="lp-form-label" style={{ marginBottom: 0 }}>
                    Photos
                  </label>
                  <span className="lp-optional-tag">
                    Up to 6 · the first one is your cover
                  </span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                />

                <div className="lp-photos-row">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="lp-photo-card">
                      <img
                        src={photo}
                        alt={`Property preview ${index + 1}`}
                        className="lp-photo-img"
                      />
                      {index === 0 && (
                        <span className="lp-photo-cover-badge">Cover</span>
                      )}
                      <button
                        type="button"
                        className="lp-photo-delete-btn"
                        onClick={() => handleRemovePhoto(index)}
                        title="Remove photo"
                        aria-label="Remove photo"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {formData.photos.length < 6 && (
                    <button
                      type="button"
                      className="lp-add-photo-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#64748B"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                        <line x1="16" y1="5" x2="22" y2="5" />
                        <line x1="19" y1="2" x2="19" y2="8" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      <span className="lp-add-photo-text">Add photo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Row 1: City & Locality */}
              <div className="lp-row-2col">
                <div className="lp-form-group" style={{ marginBottom: 0 }}>
                  <label className="lp-form-label" htmlFor="lp-city-input">
                    City
                  </label>
                  <input
                    id="lp-city-input"
                    className="lp-input"
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                  />
                </div>

                <div className="lp-form-group" style={{ marginBottom: 0 }}>
                  <div className="lp-label-row">
                    <label
                      className="lp-form-label"
                      htmlFor="lp-locality-input"
                      style={{ marginBottom: 0 }}
                    >
                      Locality
                    </label>
                    <span className="lp-optional-tag">Optional</span>
                  </div>
                  <input
                    id="lp-locality-input"
                    className="lp-input"
                    type="text"
                    placeholder="e.g. Gandhi Chowk"
                    value={formData.locality}
                    onChange={(e) => handleChange("locality", e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2: Full address */}
              <div className="lp-form-group" style={{ marginTop: 24, marginBottom: 0 }}>
                <div className="lp-label-row">
                  <label
                    className="lp-form-label"
                    htmlFor="lp-address-input"
                    style={{ marginBottom: 0 }}
                  >
                    Full address
                  </label>
                  <span className="lp-optional-tag">Optional</span>
                </div>
                <input
                  id="lp-address-input"
                  className="lp-input"
                  type="text"
                  placeholder="e.g. 12th Floor, Sunrise Heights"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>

              {/* Actions: Back & Continue */}
              <div className="lp-card-actions has-back">
                <button
                  type="button"
                  className="lp-btn-back"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button type="submit" className="lp-btn-continue">
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── STEP 3: PROPERTY DETAILS (Matches Reference Image 3) ── */}
        {step === 3 && (
          <div className="lp-card">
            <h2 className="lp-card-title">Property details</h2>

            <form onSubmit={handleNext}>
              {/* Three-column Row: Bedrooms, Bathrooms, Area */}
              <div className="lp-row-3col">
                <div className="lp-form-group" style={{ marginBottom: 0 }}>
                  <label className="lp-form-label" htmlFor="lp-bedrooms-input">
                    Bedrooms
                  </label>
                  <input
                    id="lp-bedrooms-input"
                    className="lp-input"
                    type="number"
                    placeholder="e.g. 3"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange("bedrooms", e.target.value)}
                    required
                  />
                </div>

                <div className="lp-form-group" style={{ marginBottom: 0 }}>
                  <label className="lp-form-label" htmlFor="lp-bathrooms-input">
                    Bathrooms
                  </label>
                  <input
                    id="lp-bathrooms-input"
                    className="lp-input"
                    type="number"
                    placeholder="e.g. 2"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange("bathrooms", e.target.value)}
                    required
                  />
                </div>

                <div className="lp-form-group" style={{ marginBottom: 0 }}>
                  <label className="lp-form-label" htmlFor="lp-area-input">
                    Area (sq.ft)
                  </label>
                  <input
                    id="lp-area-input"
                    className="lp-input"
                    type="number"
                    placeholder="e.g. 1450"
                    value={formData.areaSqft}
                    onChange={(e) => handleChange("areaSqft", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Furnishing Dropdown */}
              <div className="lp-form-group" style={{ marginTop: 24 }}>
                <label className="lp-form-label" htmlFor="lp-furnishing-select">
                  Furnishing
                </label>
                <div className="lp-select-wrap">
                  <select
                    id="lp-furnishing-select"
                    className="lp-select"
                    value={formData.furnishing}
                    onChange={(e) => handleChange("furnishing", e.target.value)}
                  >
                    <option value="Semi-furnished">Semi-furnished</option>
                    <option value="Fully furnished">Fully furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                  <span className="lp-select-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Amenities Section */}
              <div className="lp-form-group" style={{ marginTop: 24, marginBottom: 8 }}>
                <div className="lp-label-row">
                  <label className="lp-form-label" style={{ marginBottom: 0 }}>
                    Amenities
                  </label>
                  <span className="lp-optional-tag">Tap all that apply</span>
                </div>

                <div className="lp-amenities-wrap">
                  {AMENITIES_LIST.map((amenity) => {
                    const isSelected = formData.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        className={`lp-amenity-pill ${isSelected ? "active" : ""}`}
                        onClick={() => toggleAmenity(amenity)}
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions: Back & Publish my home */}
              <div className="lp-card-actions has-back">
                <button
                  type="button"
                  className="lp-btn-back"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button type="submit" className="lp-btn-continue">
                  Publish my home
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── STEP 4: SUCCESS / PUBLISHED ── */}
        {step === 4 && (
          <div className="lp-card lp-success-card">
            <div className="lp-success-icon">✓</div>
            <h2 className="lp-success-title">Property Published!</h2>
            <p className="lp-success-desc">
              Your property is now live and visible to home seekers and renters across India.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
              <button
                type="button"
                className="lp-btn-continue"
                onClick={() => navigate("/results")}
              >
                View in Browse Homes
              </button>
              <button
                type="button"
                className="lp-btn-back"
                onClick={goToHome}
              >
                Go to Home
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ── FOOTER (Matches Reference Image 3) ── */}
      <footer className="lp-footer">
        <div className="lp-footer-content">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo">
              <span className="lp-logo-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </span>
              NestWise
            </div>
            <p className="lp-footer-text">
              A smarter way to rent and buy apartments in India — verified listings, honest pricing.
            </p>
            <p className="lp-footer-copy">© 2026 NestWise</p>
          </div>

          <div className="lp-footer-links">
            <Link to="/results" className="lp-footer-link">
              Browse homes
            </Link>
            <Link to="/results" className="lp-footer-link">
              For rent
            </Link>
            <Link to="/results" className="lp-footer-link">
              For sale
            </Link>
            <Link to="/list-property" className="lp-footer-link">
              List your property
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default ListProperty;