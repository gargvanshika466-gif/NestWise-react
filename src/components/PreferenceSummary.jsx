import { formatPrice } from "../store/propertiesApi"

/* Live preview of the preferences while the form is being filled. */

function PreferenceSummary({
  name,
  propertyType,
  bhk,
  location,
  minBudget,
  maxBudget,
  selectedAmenities,
  furnishing,
}) {

  const hasAnything =
    name || location || propertyType || bhk ||
    minBudget || maxBudget || furnishing ||
    selectedAmenities.length > 0

  return (
    <aside className="nw-summary-card" aria-live="polite">

      <div className="nw-form-heading">

        <span>✓</span>

        <div>
          <h2>Your Preferences</h2>
          <p>Here's what you're looking for.</p>
        </div>

      </div>

      {!hasAnything && (
        <p className="nw-summary-empty">
          Your choices will appear here as you fill in the form.
        </p>
      )}

      <div className="nw-summary-grid">

        {name && (
          <div className="nw-summary-item">
            <small>Name</small>
            <strong>{name}</strong>
          </div>
        )}

        {location && (
          <div className="nw-summary-item">
            <small>Location</small>
            <strong>📍 {location}</strong>
          </div>
        )}

        {propertyType && (
          <div className="nw-summary-item">
            <small>Property Type</small>
            <strong>{propertyType}</strong>
          </div>
        )}

        {bhk && (
          <div className="nw-summary-item">
            <small>Bedrooms</small>
            <strong>{bhk}</strong>
          </div>
        )}

        {(minBudget || maxBudget) && (
          <div className="nw-summary-item">
            <small>Budget</small>

            <strong>
              {formatPrice(minBudget || 0)} - {maxBudget ? formatPrice(maxBudget) : "No Limit"}
            </strong>
          </div>
        )}

        {furnishing && (
          <div className="nw-summary-item">
            <small>Furnishing</small>
            <strong>{furnishing}</strong>
          </div>
        )}

      </div>

      {selectedAmenities.length > 0 && (

        <div className="nw-summary-amenities">

          <small>Amenities</small>

          <div>
            {selectedAmenities.map((amenity) => (
              <span key={amenity}>
                ✓ {amenity}
              </span>
            ))}
          </div>

        </div>

      )}

    </aside>
  )
}

export default PreferenceSummary