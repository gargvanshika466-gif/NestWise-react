import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import "./results.css";

const properties = [
  {
    id: 1,
    title: "Modern Green Apartment",
    location: "Delhi",
    price: 18000,
    bhk: "2 BHK",
    type: "Apartment",
    furnishing: "Semi Furnished",
    amenities: ["Gym", "Parking", "Security", "Lift"],
    rating: 4.7,
    description: "Bright 2 BHK apartment in a peaceful residential area.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
  },
  {
    id: 2,
    title: "Luxury City Apartment",
    location: "Gurgaon",
    price: 28000,
    bhk: "3 BHK",
    type: "Apartment",
    furnishing: "Fully Furnished",
    amenities: ["Gym", "Parking", "Security", "Lift"],
    rating: 4.9,
    description: "Premium furnished apartment close to offices and metro.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
  },
  {
    id: 3,
    title: "Comfortable Studio",
    location: "Noida",
    price: 14000,
    bhk: "1 BHK",
    type: "Studio",
    furnishing: "Fully Furnished",
    amenities: ["Security", "Lift"],
    rating: 4.5,
    description: "Compact studio perfect for students and working professionals.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
  },
  {
    id: 4,
    title: "Spacious Family Villa",
    location: "Delhi",
    price: 55000,
    bhk: "4+ BHK",
    type: "Villa",
    furnishing: "Semi Furnished",
    amenities: ["Parking", "Security", "Gym"],
    rating: 4.8,
    description: "Large family villa with excellent parking and security.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
  },
  {
    id: 5,
    title: "Premium City Apartment",
    location: "Noida",
    price: 22000,
    bhk: "2 BHK",
    type: "Apartment",
    furnishing: "Fully Furnished",
    amenities: ["Gym", "Parking", "Lift"],
    rating: 4.6,
    description: "Modern apartment with excellent amenities and connectivity.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
  },
  {
    id: 6,
    title: "Budget Friendly PG",
    location: "Gurgaon",
    price: 9000,
    bhk: "1 BHK",
    type: "PG",
    furnishing: "Fully Furnished",
    amenities: ["Security", "Lift", "Parking"],
    rating: 4.4,
    description: "Affordable PG with furnished rooms and basic facilities.",
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800"
  },
  {
    id: 7,
    title: "Premium PG Residence",
    location: "Delhi",
    price: 13000,
    bhk: "1 BHK",
    type: "PG",
    furnishing: "Semi Furnished",
    amenities: ["Gym", "Security", "Lift"],
    rating: 4.6,
    description: "Comfortable PG located near metro and shopping areas.",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"
  },
  {
    id: 8,
    title: "Elegant Studio Home",
    location: "Gurgaon",
    price: 20000,
    bhk: "1 BHK",
    type: "Studio",
    furnishing: "Semi Furnished",
    amenities: ["Parking", "Security", "Lift"],
    rating: 4.7,
    description: "Stylish studio apartment with convenient city access.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
  },
  {
    id: 9,
    title: "Luxury Garden Villa",
    location: "Gurgaon",
    price: 75000,
    bhk: "4+ BHK",
    type: "Villa",
    furnishing: "Fully Furnished",
    amenities: ["Gym", "Parking", "Security", "Lift"],
    rating: 4.9,
    description: "Luxury villa with spacious interiors and garden space.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
  }
];

/* ---------- Constants ---------- */

const propertyTypes = ["Apartment", "Villa", "PG", "Studio"];
const bhks = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
const furnishingTypes = ["Fully Furnished", "Semi Furnished", "Unfurnished"];
const amenityList = ["Gym", "Parking", "Security", "Lift"];

const cities = [...new Set(properties.map((p) => p.location))];

const MAX_BUDGET_LIMIT = 500000;

const budgetPresets = [
  { label: "Under ₹15k", min: "", max: "15000" },
  { label: "₹15k – ₹30k", min: "15000", max: "30000" },
  { label: "₹30k – ₹60k", min: "30000", max: "60000" },
  { label: "₹60k+", min: "60000", max: "" }
];

const initialFilters = {
  search: "",
  location: "",
  type: "",
  bhk: "",
  furnishing: "",
  amenities: [],
  minBudget: "",
  maxBudget: ""
};

const averagePrice = Math.round(
  properties.reduce((sum, p) => sum + p.price, 0) / properties.length
);


/* ---------- Helpers ---------- */

function loadSaved(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function formatPrice(value) {
  return "₹" + Number(value).toLocaleString("en-IN");
}

// Returns an error message, or "" when the budget is valid
function checkBudget(min, max) {
  if (min !== "" && (isNaN(min) || Number(min) < 0)) {
    return "Minimum budget must be a positive number.";
  }

  if (max !== "" && (isNaN(max) || Number(max) <= 0)) {
    return "Maximum budget must be greater than zero.";
  }

  if (max !== "" && Number(max) > MAX_BUDGET_LIMIT) {
    return `Maximum budget cannot exceed ${formatPrice(MAX_BUDGET_LIMIT)}.`;
  }

  if (min !== "" && max !== "" && Number(min) > Number(max)) {
    return "Minimum budget cannot be greater than maximum budget.";
  }

  return "";
}


/* ---------- Small components ---------- */

function PillGroup({ options, value, onChange }) {
  return (
    <div className="nw-pills">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={value === option ? "nw-pill active" : "nw-pill"}
          onClick={() => onChange(value === option ? "" : option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}


function PropertyCard({ property, index, favorite, onFavorite, onOpen }) {

  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className="nw-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >

      <div className="nw-card-image">

        {imageFailed ? (
          <div className="nw-image-fallback">🏠 Image unavailable</div>
        ) : (
          <img
            src={property.image}
            alt={property.title}
            onError={() => setImageFailed(true)}
          />
        )}

        {property.rating >= 4.8 && (
          <span className="nw-badge">★ Top Rated</span>
        )}

        <button
          type="button"
          className={favorite ? "nw-fav active" : "nw-fav"}
          onClick={() => onFavorite(property.id)}
          aria-label="Save property"
        >
          {favorite ? "♥" : "♡"}
        </button>

        <span className="nw-type-chip">{property.type}</span>

      </div>


      <div className="nw-card-body">

        <div className="nw-price-row">
          <h3>
            {formatPrice(property.price)}
            <small> /month</small>
          </h3>
          <span className="nw-bhk">{property.bhk}</span>
        </div>

        <h4>{property.title}</h4>

        <p className="nw-location">📍 {property.location}</p>

        <p className="nw-desc">{property.description}</p>

        <div className="nw-tags">
          <span>{property.furnishing}</span>
          <span>⭐ {property.rating}</span>
        </div>

        <div className="nw-amenity-row">
          {property.amenities.map((amenity) => (
            <span key={amenity}>✓ {amenity}</span>
          ))}
        </div>

        <button
          type="button"
          className="nw-view-btn"
          onClick={() => onOpen(property)}
        >
          View Details →
        </button>

      </div>

    </div>
  );
}


function PropertyModal({ property, favorite, onFavorite, onClose }) {

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="nw-overlay" onClick={onClose}>

      <div
        className="nw-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          type="button"
          className="nw-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <img src={property.image} alt={property.title} />

        <div className="nw-modal-body">

          <div className="nw-price-row">
            <h3>
              {formatPrice(property.price)}
              <small> /month</small>
            </h3>
            <span className="nw-bhk">{property.bhk}</span>
          </div>

          <h2>{property.title}</h2>

          <p className="nw-location">📍 {property.location}</p>

          <p className="nw-modal-desc">{property.description}</p>

          <div className="nw-modal-grid">
            <div><small>Type</small><strong>{property.type}</strong></div>
            <div><small>Furnishing</small><strong>{property.furnishing}</strong></div>
            <div><small>Rating</small><strong>⭐ {property.rating}</strong></div>
            <div><small>Bedrooms</small><strong>{property.bhk}</strong></div>
          </div>

          <div className="nw-amenity-row">
            {property.amenities.map((amenity) => (
              <span key={amenity}>✓ {amenity}</span>
            ))}
          </div>

          <button
            type="button"
            className="nw-view-btn"
            onClick={() => onFavorite(property.id)}
          >
            {favorite ? "♥ Saved to favorites" : "♡ Save to favorites"}
          </button>

        </div>

      </div>

    </div>
  );
}


/* ---------- Buyers page ---------- */

function Results() {

  const savedBuyer = loadSaved("buyerData", null);
  const savedPreferences = loadSaved("buyerPreferences", {});

  const [name, setName] = useState(savedBuyer?.name || "");

  // One object holds every filter value
  const [filters, setFilters] = useState({
    ...initialFilters,
    search: savedPreferences.search || "",
    location: savedPreferences.location || "",
    type: savedPreferences.type || savedPreferences.propertyType || "",
    bhk: savedPreferences.bhk || "",
    furnishing: savedPreferences.furnishing || "",
    amenities: Array.isArray(savedPreferences.amenities)
      ? savedPreferences.amenities
      : [],
    minBudget: savedPreferences.minBudget || "",
    maxBudget: savedPreferences.maxBudget || ""
  });

  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState(() => loadSaved("buyerFavorites", []));
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);


  useEffect(() => {
    document.title = "NestWise | Find Your Home";
  }, []);

  // Keep filters between visits
  useEffect(() => {
    localStorage.setItem("buyerPreferences", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("buyerFavorites", JSON.stringify(favorites));
  }, [favorites]);


  function updateFilter(key, value) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  const toggleAmenity = useCallback((amenity) => {
    setFilters((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(amenity)
        ? previous.amenities.filter((item) => item !== amenity)
        : [...previous.amenities, amenity]
    }));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }, []);

  const closeModal = useCallback(() => setSelectedProperty(null), []);

  function resetFilters() {
    setFilters(initialFilters);
    setSortBy("recommended");
    setShowFavorites(false);
  }

  function applyPreset(preset) {
    setFilters((previous) => ({
      ...previous,
      minBudget: preset.min,
      maxBudget: preset.max
    }));
  }


  const budgetError = checkBudget(filters.minBudget, filters.maxBudget);


  // Search + filters + favorites + sorting, all on a copy of the data
  const visibleProperties = useMemo(() => {

    const search = filters.search.trim().toLowerCase();
    const city = filters.location.trim().toLowerCase();

    const result = properties.filter((property) => {

      const matchesSearch =
        !search ||
        property.title.toLowerCase().includes(search) ||
        property.location.toLowerCase().includes(search) ||
        property.type.toLowerCase().includes(search) ||
        property.description.toLowerCase().includes(search);

      const matchesCity =
        !city || property.location.toLowerCase().includes(city);

      const matchesType = !filters.type || property.type === filters.type;
      const matchesBhk = !filters.bhk || property.bhk === filters.bhk;
      const matchesFurnishing =
        !filters.furnishing || property.furnishing === filters.furnishing;

      const matchesAmenities = filters.amenities.every((amenity) =>
        property.amenities.includes(amenity)
      );

      // Budget is only applied when the typed values are valid
      const matchesMin =
        budgetError || filters.minBudget === "" ||
        property.price >= Number(filters.minBudget);

      const matchesMax =
        budgetError || filters.maxBudget === "" ||
        property.price <= Number(filters.maxBudget);

      const matchesFavorite = !showFavorites || favorites.includes(property.id);

      return (
        matchesSearch && matchesCity && matchesType && matchesBhk &&
        matchesFurnishing && matchesAmenities && matchesMin &&
        matchesMax && matchesFavorite
      );
    });

    const sorted = [...result];

    if (sortBy === "low") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "high") sorted.sort((a, b) => b.price - a.price);
    else sorted.sort((a, b) => b.rating - a.rating);

    return sorted;

  }, [filters, sortBy, showFavorites, favorites, budgetError]);


  // Chips that show which filters are on
  const activeChips = [];

  if (filters.search.trim()) {
    activeChips.push({ label: `"${filters.search.trim()}"`, remove: () => updateFilter("search", "") });
  }
  if (filters.location) {
    activeChips.push({ label: `📍 ${filters.location}`, remove: () => updateFilter("location", "") });
  }
  if (filters.type) {
    activeChips.push({ label: filters.type, remove: () => updateFilter("type", "") });
  }
  if (filters.bhk) {
    activeChips.push({ label: filters.bhk, remove: () => updateFilter("bhk", "") });
  }
  if (filters.furnishing) {
    activeChips.push({ label: filters.furnishing, remove: () => updateFilter("furnishing", "") });
  }
  filters.amenities.forEach((amenity) => {
    activeChips.push({ label: amenity, remove: () => toggleAmenity(amenity) });
  });
  if (!budgetError && (filters.minBudget || filters.maxBudget)) {
    activeChips.push({
      label: `${formatPrice(filters.minBudget || 0)} – ${filters.maxBudget ? formatPrice(filters.maxBudget) : "No limit"}`,
      remove: () => setFilters((p) => ({ ...p, minBudget: "", maxBudget: "" }))
    });
  }


  return (

    <div className="nw-page">

      {/* TOP BAR */}

      <div className="nw-topbar">
        <Link to="/" className="nw-logo">NestWise</Link>

        <div className="nw-topbar-links">
          <Link to="/">Home</Link>
          <Link to="/seller">Sell / Rent Out</Link>
        </div>
      </div>


      {/* HERO */}

      <header className="nw-hero">

        <span className="nw-orb nw-orb-1"></span>
        <span className="nw-orb nw-orb-2"></span>

        <div className="nw-hero-content">

          <p className="nw-eyebrow">● SMART HOME SEARCH</p>

          <h1>
            Find Your <span>Perfect Home</span>
          </h1>

          <p className="nw-hero-text">
            {name
              ? `Welcome ${name}! Search, filter and compare homes that match your needs.`
              : "Search, filter and compare homes that match your needs."}
          </p>

          <div className="nw-search">
            <span>🔍</span>
            <input
              type="text"
              value={filters.search}
              placeholder="Search by name, city, type..."
              onChange={(e) => updateFilter("search", e.target.value)}
            />
            {filters.search && (
              <button type="button" onClick={() => updateFilter("search", "")}>
                ✕
              </button>
            )}
          </div>

          <div className="nw-stats">
            <div>
              <strong>{properties.length}</strong>
              <small>Listings</small>
            </div>
            <div>
              <strong>{cities.length}</strong>
              <small>Cities</small>
            </div>
            <div>
              <strong>{formatPrice(averagePrice)}</strong>
              <small>Avg. rent</small>
            </div>
          </div>

        </div>

      </header>


      <div className="nw-layout">

        {/* FILTER PANEL */}

        <aside className={showFilters ? "nw-filters open" : "nw-filters"}>

          <div className="nw-filters-head">
            <h2>Filters</h2>
            <button type="button" onClick={resetFilters}>Reset all</button>
          </div>

          <div className="nw-group">
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="nw-group">
            <label>Location</label>
            <PillGroup
              options={cities}
              value={filters.location}
              onChange={(value) => updateFilter("location", value)}
            />
          </div>

          <div className="nw-group">
            <label>Property Type</label>
            <PillGroup
              options={propertyTypes}
              value={filters.type}
              onChange={(value) => updateFilter("type", value)}
            />
          </div>

          <div className="nw-group">
            <label>Monthly Budget (₹)</label>

            <div className="nw-budget">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={filters.minBudget}
                className={budgetError ? "invalid" : ""}
                onChange={(e) => updateFilter("minBudget", e.target.value)}
              />
              <span>to</span>
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={filters.maxBudget}
                className={budgetError ? "invalid" : ""}
                onChange={(e) => updateFilter("maxBudget", e.target.value)}
              />
            </div>

            {budgetError && <p className="nw-error">⚠ {budgetError}</p>}

            <div className="nw-pills nw-presets">
              {budgetPresets.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  className="nw-pill"
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="nw-group">
            <label>Bedrooms</label>
            <PillGroup
              options={bhks}
              value={filters.bhk}
              onChange={(value) => updateFilter("bhk", value)}
            />
          </div>

          <div className="nw-group">
            <label>Furnishing</label>
            <PillGroup
              options={furnishingTypes}
              value={filters.furnishing}
              onChange={(value) => updateFilter("furnishing", value)}
            />
          </div>

          <div className="nw-group">
            <label>Amenities</label>
            <div className="nw-pills">
              {amenityList.map((amenity) => (
                <button
                  type="button"
                  key={amenity}
                  className={
                    filters.amenities.includes(amenity)
                      ? "nw-pill active"
                      : "nw-pill"
                  }
                  onClick={() => toggleAmenity(amenity)}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

        </aside>


        {/* RESULTS */}

        <main className="nw-results">

          <div className="nw-toolbar">

            <div>
              <h2>Recommended Properties</h2>
              <p>
                {visibleProperties.length} of {properties.length} properties
              </p>
            </div>

            <div className="nw-toolbar-actions">

              <button
                type="button"
                className="nw-filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                ⚙ Filters
              </button>

              <button
                type="button"
                className={showFavorites ? "nw-fav-toggle active" : "nw-fav-toggle"}
                onClick={() => setShowFavorites(!showFavorites)}
              >
                ♥ Saved ({favorites.length})
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Sort: Top Rated</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>

            </div>

          </div>


          {activeChips.length > 0 && (
            <div className="nw-chips">
              {activeChips.map((chip) => (
                <button type="button" key={chip.label} onClick={chip.remove}>
                  {chip.label} <span>✕</span>
                </button>
              ))}
              <button type="button" className="nw-clear" onClick={resetFilters}>
                Clear all
              </button>
            </div>
          )}


          {visibleProperties.length === 0 ? (

            <div className="nw-empty">

              <div className="nw-empty-icon">🔎</div>

              <h3>
                {showFavorites && favorites.length === 0
                  ? "No saved properties yet"
                  : "No properties match your search"}
              </h3>

              <p>
                {showFavorites && favorites.length === 0
                  ? "Tap the heart on a property to save it here."
                  : "Try removing a filter or widening your budget."}
              </p>

              <button type="button" onClick={resetFilters}>
                Reset Filters
              </button>

            </div>

          ) : (

            <div className="nw-grid">

              {visibleProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                  favorite={favorites.includes(property.id)}
                  onFavorite={toggleFavorite}
                  onOpen={setSelectedProperty}
                />
              ))}

            </div>

          )}

        </main>

      </div>


      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          favorite={favorites.includes(selectedProperty.id)}
          onFavorite={toggleFavorite}
          onClose={closeModal}
        />
      )}

    </div>
  );
}

export default Results;