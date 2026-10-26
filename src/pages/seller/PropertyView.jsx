import { useParams, useNavigate } from "react-router-dom";
import { useSeller } from "../../Content/SellerContext";
import "./PropertyView.css";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f0eaff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='80' fill='%23c4b5e8'%3E🏠%3C/text%3E%3C/svg%3E";

function PropertyView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties } = useSeller();

  const property = properties.find((p) => String(p.id) === String(id));

  if (!property) {
    return (
      <section className="property-view">
        <div className="pv-not-found">
          <div className="pv-not-found-icon">🏚️</div>
          <h2>Property Not Found</h2>
          <p>This property does not exist or may have been deleted.</p>
          <button onClick={() => navigate("/seller/properties")}>
            ← Back to My Properties
          </button>
        </div>
      </section>
    );
  }

  function statusClass(status) {
    return status ? status.toLowerCase() : "";
  }

  return (
    <section className="property-view">

      <div className="pv-back-row">
        <button
          className="pv-back-btn"
          onClick={() => navigate("/seller/properties")}
        >
          ← Back to My Properties
        </button>
      </div>


      {/* Hero Image */}
      <div className="pv-hero">
        <img
          src={property.image || PLACEHOLDER_IMAGE}
          alt={property.title}
          onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
        />

        <div className="pv-hero-overlay">
          <span className={`pv-status-badge ${statusClass(property.status)}`}>
            {property.status}
          </span>
        </div>
      </div>


      {/* Content */}
      <div className="pv-content">

        {/* Top */}
        <div className="pv-top">
          <div>
            <h1 className="pv-title">{property.title}</h1>
            {property.type && (
              <span className="pv-type-badge">{property.type}</span>
            )}
            <span className={`pv-listing-type-badge ${property.listingType === "sale" ? "pv-badge-sale" : "pv-badge-rent"}`}>
              {property.listingType === "sale" ? "🏷️ For Sale" : "🏠 For Rent"}
            </span>
          </div>
          <div className="pv-rent">
            {property.listingType === "sale" ? (
              <>
                ₹{Number(property.salePrice).toLocaleString("en-IN")}
                <span> (Sale Price)</span>
              </>
            ) : (
              <>
                ₹{Number(property.rent).toLocaleString("en-IN")}
                <span>/month</span>
              </>
            )}
          </div>
        </div>


        {/* Location */}
        {(property.location || property.city) && (
          <p className="pv-location">
            📍 {[property.location, property.city].filter(Boolean).join(", ")}
          </p>
        )}


        {/* Details Grid */}
        <div className="pv-details-grid">

          {property.bedrooms && (
            <div className="pv-detail-card">
              <div className="pv-detail-icon">🛏</div>
              <div className="pv-detail-value">{property.bedrooms}</div>
              <div className="pv-detail-label">Bedrooms</div>
            </div>
          )}

          {property.bathrooms && (
            <div className="pv-detail-card">
              <div className="pv-detail-icon">🚿</div>
              <div className="pv-detail-value">{property.bathrooms}</div>
              <div className="pv-detail-label">Bathrooms</div>
            </div>
          )}

          {property.area && (
            <div className="pv-detail-card">
              <div className="pv-detail-icon">📐</div>
              <div className="pv-detail-value">{property.area}</div>
              <div className="pv-detail-label">sq.ft</div>
            </div>
          )}

          {property.furnishing && (
            <div className="pv-detail-card">
              <div className="pv-detail-icon">🛋️</div>
              <div className="pv-detail-value pv-detail-value-sm">{property.furnishing}</div>
              <div className="pv-detail-label">Furnishing</div>
            </div>
          )}

          {property.floor && (
            <div className="pv-detail-card">
              <div className="pv-detail-icon">🏢</div>
              <div className="pv-detail-value pv-detail-value-sm">{property.floor}</div>
              <div className="pv-detail-label">Floor</div>
            </div>
          )}

          {property.securityDeposit && (
            <div className="pv-detail-card">
              <div className="pv-detail-icon">💰</div>
              <div className="pv-detail-value pv-detail-value-sm">
                ₹{Number(property.securityDeposit).toLocaleString("en-IN")}
              </div>
              <div className="pv-detail-label">Security Deposit</div>
            </div>
          )}

        </div>


        {/* Address & Landmark */}
        {(property.address || property.landmark) && (
          <div className="pv-section">
            <h3>Address Details</h3>
            {property.address && (
              <p className="pv-info-row">
                <span>🏡</span>
                <span>{property.address}</span>
              </p>
            )}
            {property.landmark && (
              <p className="pv-info-row">
                <span>📌</span>
                <span>Near {property.landmark}</span>
              </p>
            )}
          </div>
        )}


        {/* Description */}
        {property.description && (
          <div className="pv-section">
            <h3>Description</h3>
            <p className="pv-description">{property.description}</p>
          </div>
        )}


        {/* Action Buttons */}
        <div className="pv-actions">
          <button
            className="pv-btn-edit"
            onClick={() => navigate(`/seller/properties/${property.id}/edit`)}
          >
            ✏️ Edit Property
          </button>

          <button
            className="pv-btn-back"
            onClick={() => navigate("/seller/properties")}
          >
            ← Back
          </button>
        </div>

      </div>

    </section>
  );
}

export default PropertyView;
