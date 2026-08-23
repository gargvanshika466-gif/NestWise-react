import { useState, useMemo } from "react";

const properties = [
  {
    id: 1,
    title: "Modern Green Apartment",
    location: "Delhi, India",
    price: 18000,
    bhk: "2 BHK",
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  },
  {
    id: 2,
    title: "Luxury City Apartment",
    location: "Gurgaon, India",
    price: 25000,
    bhk: "3 BHK",
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
  },
  {
    id: 3,
    title: "Comfortable Studio",
    location: "Noida, India",
    price: 12000,
    bhk: "1 BHK",
    type: "Studio",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600",
  },
  {
    id: 4,
    title: "Spacious Family Home",
    location: "Delhi, India",
    price: 30000,
    bhk: "4+ BHK",
    type: "Villa",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600",
  },
];

function Results() {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedType, setSelectedType] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.location.toLowerCase().includes(search.toLowerCase()) ||
        property.title.toLowerCase().includes(search.toLowerCase());

      const matchesPrice = property.price <= maxPrice;

      const matchesType =
        selectedType === "All" || property.type === selectedType;

      return matchesSearch && matchesPrice && matchesType;
    });
  }, [search, maxPrice, selectedType]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="results-page">

      {/* Header */}
      <div className="results-header">
        <div>
          <p className="result-label">NESTWISE</p>
          <h1>Find Your Dream Home</h1>
          <p>Homes selected according to your preferences</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="filter-box">

        <input
          type="text"
          placeholder="Search location or home..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Studio">Studio</option>
        </select>

        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        >
          <option value="50000">Any Budget</option>
          <option value="15000">Under ₹15,000</option>
          <option value="20000">Under ₹20,000</option>
          <option value="30000">Under ₹30,000</option>
        </select>

      </div>

      {/* Main Content */}
      <div className="results-content">

        <div className="properties-section">

          <div className="section-top">
            <h2>Recommended Homes</h2>
            <span>{filteredProperties.length} homes found</span>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <h3>No homes found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          ) : (
            <div className="property-grid">

              {filteredProperties.map((property) => (
                <div className="property-card" key={property.id}>

                  <div className="property-image">
                    <img src={property.image} alt={property.title} />

                    <button
                      className="favorite-btn"
                      onClick={() => toggleFavorite(property.id)}
                    >
                      {favorites.includes(property.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="property-info">

                    <div className="price-row">
                      <h3>₹{property.price.toLocaleString()}</h3>
                      <span>{property.bhk}</span>
                    </div>

                    <h4>{property.title}</h4>

                    <p className="location">
                      📍 {property.location}
                    </p>

                    <div className="property-tags">
                      <span>{property.type}</span>
                      <span>🔒 Security</span>
                      <span>🚗 Parking</span>
                    </div>

                    <button className="view-btn">
                      View Details
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* Simple Map Section */}
        <div className="map-section">

          <div className="map-header">
            <h3>Property Locations</h3>
            <p>Explore homes around your preferred area</p>
          </div>

          <div className="simple-map">

            <span className="map-pin pin1">📍</span>
            <span className="map-pin pin2">📍</span>
            <span className="map-pin pin3">📍</span>
            <span className="map-pin pin4">📍</span>

            <div className="map-center">
              <strong>Homes Near You</strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Results;