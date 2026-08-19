function PreferenceSummary({
  name,
  propertyType,
  bhk,
  location,
  minBudget,
  maxBudget,
  selectedAmenities,
  furnishing,
  petFriendly,
  metro,
  safety,
}) {

  return (
    <div className="summary-card">

      <div className="section-heading">

        <span>✓</span>

        <div>
          <h2>Your Preferences</h2>
          <p>Here's what you're looking for.</p>
        </div>

      </div>


      <div className="summary-grid">

        {name && (
          <div className="summary-item">
            <small>Name</small>
            <strong>{name}</strong>
          </div>
        )}


        {location && (
          <div className="summary-item">
            <small>Location</small>
            <strong>📍 {location}</strong>
          </div>
        )}


        {propertyType && (
          <div className="summary-item">
            <small>Property Type</small>
            <strong>{propertyType}</strong>
          </div>
        )}


        {bhk && (
          <div className="summary-item">
            <small>Bedrooms</small>
            <strong>{bhk}</strong>
          </div>
        )}


        {(minBudget || maxBudget) && (
          <div className="summary-item">
            <small>Budget</small>

            <strong>
              ₹{minBudget || "0"} - ₹{maxBudget || "No Limit"}
            </strong>
          </div>
        )}


        {furnishing && (
          <div className="summary-item">
            <small>Furnishing</small>
            <strong>{furnishing}</strong>
          </div>
        )}


        {petFriendly && (
          <div className="summary-item">
            <small>Pet Friendly</small>
            <strong>{petFriendly}</strong>
          </div>
        )}


        {metro && (
          <div className="summary-item">
            <small>Metro</small>
            <strong>{metro}</strong>
          </div>
        )}


        {safety && (
          <div className="summary-item">
            <small>Safety</small>
            <strong>{safety}</strong>
          </div>
        )}

      </div>


      {selectedAmenities.length > 0 && (

        <div className="summary-amenities">

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

    </div>
  )
}

export default PreferenceSummary