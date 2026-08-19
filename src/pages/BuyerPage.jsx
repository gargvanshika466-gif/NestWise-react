import { useState } from "react"
import PreferenceOptions from "../components/PreferenceOptions"

function BuyerPage() {

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [budget, setBudget] = useState("")

  const [propertyType, setPropertyType] = useState("")
  const [bhk, setBhk] = useState("")
  const [furnishing, setFurnishing] = useState("")

  const [amenities, setAmenities] = useState([])

  const propertyTypes = ["Apartment", "Villa", "PG", "Studio"]
  const bhks = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"]
  const furnishingTypes = ["Fully Furnished", "Semi Furnished", "Unfurnished"]

  const amenityList = [
    "Gym",
    "Parking",
    "Security",
    "Lift"
  ]

  function handleAmenity(amenity) {

    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity))
    } else {
      setAmenities([...amenities, amenity])
    }

  }

  function handleSubmit(e) {
    e.preventDefault()
    alert("Preferences Saved!")
  }

  return (

    <div className="buyer-page">

      <h1>Find Your Perfect Home</h1>

      <p>Tell us what you are looking for.</p>


      <form onSubmit={handleSubmit}>

        {/* Basic Details */}

        <div className="card">

          <h2>Basic Details</h2>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Preferred Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="number"
            placeholder="Monthly Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

        </div>


        {/* Property Type */}

        <PreferenceOptions
          title="Property Type"
          options={propertyTypes}
          value={propertyType}
          setValue={setPropertyType}
        />


        {/* BHK */}

        <PreferenceOptions
          title="Bedrooms"
          options={bhks}
          value={bhk}
          setValue={setBhk}
        />


        {/* Furnishing */}

        <PreferenceOptions
          title="Furnishing"
          options={furnishingTypes}
          value={furnishing}
          setValue={setFurnishing}
        />


        {/* Amenities */}

        <div className="section">

          <h3>Amenities</h3>

          {amenityList.map((amenity) => (

            <label key={amenity}>

              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => handleAmenity(amenity)}
              />

              {amenity}

            </label>

          ))}

        </div>


        <button type="submit">
          Find My Home
        </button>

      </form>


      {/* Summary */}

      {name && (
        <div className="summary">

          <h2>Your Preferences</h2>

          <p>Name: {name}</p>
          <p>Location: {location}</p>
          <p>Budget: ₹{budget}</p>
          <p>Property: {propertyType}</p>
          <p>Bedrooms: {bhk}</p>
          <p>Furnishing: {furnishing}</p>
          <p>
            Amenities: {amenities.join(", ")}
          </p>

        </div>
      )}

    </div>
  )
}

export default BuyerPage