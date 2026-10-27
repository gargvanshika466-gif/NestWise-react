function Amenities({
  amenities,
  selectedAmenities,
  onAmenityChange,
}) {
  return (
    <div className="nw-form-card">

      <div className="nw-form-heading">
        <span>4</span>

        <div>
          <h2>Preferred Amenities</h2>
          <p>Select everything that matters to you.</p>
        </div>
      </div>


      <div className="nw-amenities-grid">

        {amenities.map((amenity) => (

          <label
            key={amenity}
            className={`nw-option ${
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