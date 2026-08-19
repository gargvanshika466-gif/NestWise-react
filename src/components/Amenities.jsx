function Amenities({
  amenities,
  selectedAmenities,
  onAmenityChange,
}) {
  return (
    <div className="buyer-card">

      <div className="section-heading">
        <span>05</span>

        <div>
          <h2>Preferred Amenities</h2>
          <p>Select everything that matters to you.</p>
        </div>
      </div>


      <div className="amenities-grid">

        {amenities.map((amenity) => (

          <label
            key={amenity}
            className={`amenity-option ${
              selectedAmenities.includes(amenity)
                ? "selected"
                : ""
            }`}
          >

            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => onAmenityChange(amenity)}
            />

            <span>{amenity}</span>

          </label>

        ))}

      </div>

    </div>
  )
}

export default Amenities