import { useState } from "react"

function SellerPage() {

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [rent, setRent] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [bhk, setBhk] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    alert("Property Listed!")
  }

  return (
    <div className="buyer-page">
      <h1>List Your Property</h1>
      <p>Tell us about the place you want to list.</p>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h2>Property Details</h2>

          <input
            type="text"
            placeholder="Owner Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Property Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="number"
            placeholder="Monthly Rent"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />

          <input
            type="text"
            placeholder="Property Type (Apartment/PG/Studio)"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          />

          <input
            type="text"
            placeholder="Bedrooms (e.g. 2 BHK)"
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
          />
        </div>

        <button type="submit">List My Property</button>
      </form>

      {name && (
        <div className="summary">
          <h2>Listing Preview</h2>
          <p>Owner: {name}</p>
          <p>Location: {location}</p>
          <p>Rent: ₹{rent}</p>
          <p>Type: {propertyType}</p>
          <p>Bedrooms: {bhk}</p>
        </div>
      )}
    </div>
  )
}

export default SellerPage