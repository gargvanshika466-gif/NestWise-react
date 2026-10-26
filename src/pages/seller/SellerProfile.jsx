import { useState } from "react";
import "./SellerProfile.css";

const PROFILE_KEY = "sellerProfile";

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : { name: "", email: "", phone: "" };
  } catch {
    return { name: "", email: "", phone: "" };
  }
}

function SellerProfile() {
  const [profile, setProfile] = useState(loadProfile);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!profile.name.trim()) newErrors.name = "Name is required.";
    if (!profile.email.trim()) newErrors.email = "Email is required.";
    return newErrors;
  }

  function handleSave(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setSaved(true);
  }

  return (
    <section className="seller-profile-page">

      <div className="sp-header">
        <h1>Seller Profile</h1>
        <p>Manage your account information.</p>
      </div>

      <div className="sp-card">

        <div className="sp-avatar-section">
          <div className="sp-avatar">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "👤"}
          </div>
          <div>
            <h2 className="sp-name">{profile.name || "Your Name"}</h2>
            <p className="sp-subtitle">Seller Account</p>
          </div>
        </div>

        <form className="sp-form" onSubmit={handleSave}>

          <div className="sp-form-group">
            <label htmlFor="sp-name">Full Name *</label>
            <input
              id="sp-name"
              type="text"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={profile.name}
              onChange={handleChange}
              className={errors.name ? "sp-input-error" : ""}
            />
            {errors.name && <span className="sp-field-error">{errors.name}</span>}
          </div>

          <div className="sp-form-group">
            <label htmlFor="sp-email">Email Address *</label>
            <input
              id="sp-email"
              type="email"
              name="email"
              placeholder="e.g. rahul@example.com"
              value={profile.email}
              onChange={handleChange}
              className={errors.email ? "sp-input-error" : ""}
            />
            {errors.email && <span className="sp-field-error">{errors.email}</span>}
          </div>

          <div className="sp-form-group">
            <label htmlFor="sp-phone">Phone Number</label>
            <input
              id="sp-phone"
              type="tel"
              name="phone"
              placeholder="e.g. +91 98765 43210"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="sp-form-actions">
            {saved && (
              <span className="sp-save-success">
                ✅ Profile saved successfully!
              </span>
            )}
            <button type="submit" className="sp-save-btn">
              💾 Save Profile
            </button>
          </div>

        </form>

      </div>

    </section>
  );
}

export default SellerProfile;
