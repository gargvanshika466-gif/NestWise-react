import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./results.css";

import FormInput from "../components/FormInput";
import useForm, { todayISO, validators, validateBudget } from "../hooks/useForm";

import {
  initialPreferences,
  paramsToPreferences,
  preferencesToParams,
  useBuyer
} from "../context/BuyerContext";

import {
  clearFavorites,
  fetchProperties,
  requestVisit,
  resetVisitStatus,
  selectFavoriteIds,
  selectSavedSummary,
  toggleFavorite
} from "../store/buyerStore";

import {
  AMENITY_OPTIONS,
  BHK_OPTIONS,
  FURNISHING_OPTIONS,
  PROPERTY_TYPES,
  formatPrice
} from "../store/propertiesApi";


/* =========================================================
   BUYERS PAGE  (route: /results  and  /results/:propertyId)

   Where each kind of state lives
   ------------------------------
   Redux Toolkit  properties (async), favorites, visit requests
   Context API    buyer profile + saved search preferences
   URL            sort order, "saved only" view, open property
   Local state    filters being edited, filter drawer open/closed
========================================================= */

/* ---------- Constants ---------- */

const budgetPresets = [
  { label: "Under ₹15k", min: "", max: "15000" },
  { label: "₹15k – ₹30k", min: "15000", max: "30000" },
  { label: "₹30k – ₹60k", min: "30000", max: "60000" },
  { label: "₹60k+", min: "60000", max: "" }
];

const SORT_OPTIONS = ["recommended", "low", "high"];


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


// Placeholder card shown while the properties are loading
function PropertySkeleton() {
  return (
    <div className="nw-card nw-skeleton" aria-hidden="true">
      <div className="nw-skeleton-image"></div>

      <div className="nw-card-body">
        <div className="nw-skeleton-line nw-w-40"></div>
        <div className="nw-skeleton-line nw-w-70"></div>
        <div className="nw-skeleton-line nw-w-50"></div>
        <div className="nw-skeleton-line nw-w-90"></div>
      </div>
    </div>
  );
}


const PropertyCard = memo(function PropertyCard({
  property,
  index,
  favorite,
  onFavorite,
  onOpen
}) {

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
});


/* ---------- Visit request form (form handling + async state) ---------- */

function validateVisit(values) {
  return {
    name: validators.name(values.name),
    email: validators.email(values.email),
    phone: validators.phone(values.phone, true),
    visitDate: validators.visitDate(values.visitDate)
  };
}

function VisitRequestForm({ property }) {

  const dispatch = useDispatch();
  const { buyer } = useBuyer();

  const { requests, status, error } = useSelector((state) => state.visits);

  const existingRequest = requests.find(
    (request) => request.propertyId === property.id
  );

  const sending = status === "loading";

  const form = useForm({

    initialValues: {
      name: buyer.name,
      email: buyer.email,
      phone: buyer.phone,
      visitDate: ""
    },

    validate: validateVisit,

    onSubmit(values) {
      dispatch(
        requestVisit({
          propertyId: property.id,
          propertyTitle: property.title,
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          visitDate: values.visitDate
        })
      );
    }

  });

  // Start every opened property with a clean request status
  useEffect(() => {
    dispatch(resetVisitStatus());
  }, [dispatch, property.id]);


  if (existingRequest) {
    return (
      <div className="nw-banner nw-banner-success" role="status">
        <span>
          ✓ Visit requested for <strong>{existingRequest.visitDate}</strong>.
          The owner will contact you on {existingRequest.phone}.
        </span>
      </div>
    );
  }

  return (
    <form
      className="nw-visit-form"
      onSubmit={form.handleSubmit}
      noValidate
    >

      <h3>Book a visit</h3>

      <div className="nw-form-row">

        <FormInput
          label="Your Name"
          placeholder="Full name"
          autoComplete="name"
          required
          {...form.getFieldProps("name")}
        />

        <FormInput
          label="Phone"
          type="tel"
          placeholder="10-digit mobile"
          autoComplete="tel"
          inputMode="numeric"
          required
          {...form.getFieldProps("phone")}
        />

      </div>

      <FormInput
        label="Email"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
        required
        {...form.getFieldProps("email")}
      />

      <FormInput
        label="Preferred visit date"
        type="date"
        min={todayISO()}
        required
        {...form.getFieldProps("visitDate")}
      />

      {status === "failed" && (
        <div className="nw-banner nw-banner-error" role="alert">
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="nw-view-btn"
        disabled={sending}
      >
        {sending ? "Sending request..." : "Request a visit"}
      </button>

    </form>
  );
}

/* ---------- Property details (opened by the /results/:propertyId route) ---------- */

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

          <VisitRequestForm property={property} />

        </div>

      </div>

    </div>
  );
}


// Shown when the URL has an id that does not exist, e.g. /results/999
function MissingPropertyModal({ onClose }) {
  return (
    <div className="nw-overlay" onClick={onClose}>

      <div
        className="nw-modal nw-modal-missing"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="nw-empty-icon">🏚️</div>

        <h2>Property not found</h2>

        <p>This listing may have been removed or the link is incorrect.</p>

        <button type="button" className="nw-view-btn" onClick={onClose}>
          Back to all homes
        </button>

      </div>

    </div>
  );
}


/* ---------- Buyers page ---------- */

function Results() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { propertyId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { buyer, preferences, updatePreferences } = useBuyer();

  // Redux: async property list + saved homes
  const { items: properties, status, error } = useSelector(
    (state) => state.properties
  );
  const favorites = useSelector(selectFavoriteIds);
  const savedSummary = useSelector(selectSavedSummary);

  // URL: how the list is shown
  const sortParam = searchParams.get("sort");
  const sortBy = SORT_OPTIONS.includes(sortParam) ? sortParam : "recommended";
  const showFavorites = searchParams.get("saved") === "1";

  // Local state: the filters being edited
  // (start from the URL if it has filters, otherwise from the saved preferences)
  const [filters, setFilters] = useState(
    () => paramsToPreferences(searchParams) ?? preferences
  );
  const [showFilters, setShowFilters] = useState(false);

  const isLoading = status === "idle" || status === "loading";


  useEffect(() => {
    document.title = "NestWise | Find Your Home";
  }, []);

  // Load the properties from the (mock) API
  useEffect(() => {
    if (status === "idle") dispatch(fetchProperties());
  }, [status, dispatch]);


  const cities = useMemo(
    () => [...new Set(properties.map((p) => p.location))],
    [properties]
  );

  const averagePrice = useMemo(
    () =>
      properties.length
        ? Math.round(
            properties.reduce((sum, p) => sum + p.price, 0) / properties.length
          )
        : 0,
    [properties]
  );


  /* ----- Changing filters: update local state, Context and the URL together ----- */

  // view: sort / saved overrides.   options.replace: false adds a history entry
  function applyFilters(changedFilters, view = {}, options = {}) {

    // Work on a copy so the filters currently on screen are never changed in place
    const nextFilters = {
      ...changedFilters,
      amenities: [...changedFilters.amenities]
    };

    setFilters(nextFilters);
    updatePreferences(nextFilters);

    const query = preferencesToParams(nextFilters, {
      sort: view.sort ?? sortBy,
      saved: view.saved ?? showFavorites
    }).toString();

    setSearchParams(query, { replace: options.replace ?? true });
  }

  function updateFilter(key, value) {
    applyFilters({ ...filters, [key]: value });
  }

  function toggleAmenity(amenity) {
    applyFilters({
      ...filters,
      amenities: filters.amenities.includes(amenity)
        ? filters.amenities.filter((item) => item !== amenity)
        : [...filters.amenities, amenity]
    });
  }

  function applyPreset(preset) {
    applyFilters({
      ...filters,
      minBudget: preset.min,
      maxBudget: preset.max
    });
  }

  function clearBudget() {
    applyFilters({ ...filters, minBudget: "", maxBudget: "" });
  }

  function resetFilters() {
    applyFilters(initialPreferences, { sort: "recommended", saved: false });
  }

  // Sort order and "saved only" live in the URL; the other params stay as they are
  function changeSort(value) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value === "recommended") next.delete("sort");
        else next.set("sort", value);

        return next;
      },
      { replace: true }
    );
  }

  function toggleSavedView() {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      if (showFavorites) next.delete("saved");
      else next.set("saved", "1");

      return next;
    });
  }


  /* ----- Property details live in the URL: /results/:propertyId ----- */

  const openProperty = useCallback(
    (property) =>
      navigate({
        pathname: `/results/${property.id}`,
        search: location.search
      }),
    [navigate, location.search]
  );

  const closeModal = useCallback(
    () => navigate({ pathname: "/results", search: location.search }),
    [navigate, location.search]
  );

  const handleFavorite = useCallback(
    (id) => dispatch(toggleFavorite(id)),
    [dispatch]
  );

  const selectedProperty = propertyId
    ? properties.find((property) => String(property.id) === propertyId)
    : null;


  const budgetError =
    Object.values(validateBudget(filters.minBudget, filters.maxBudget))[0] || "";


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

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  }, [properties, filters, sortBy, showFavorites, favorites, budgetError]);


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
      remove: clearBudget
    });
  }


  return (

    <>

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
            {buyer.name
              ? `Welcome ${buyer.name}! Search, filter and compare homes that match your needs.`
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
              <strong>{isLoading ? "—" : properties.length}</strong>
              <small>Listings</small>
            </div>
            <div>
              <strong>{isLoading ? "—" : cities.length}</strong>
              <small>Cities</small>
            </div>
            <div>
              <strong>{isLoading ? "—" : formatPrice(averagePrice)}</strong>
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
            <label>Searching as</label>
            <p className="nw-profile-name">{buyer.name || "Guest"}</p>
            <Link to="/buyer" className="nw-profile-link">
              Edit my preferences →
            </Link>
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
              options={PROPERTY_TYPES}
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
              options={BHK_OPTIONS}
              value={filters.bhk}
              onChange={(value) => updateFilter("bhk", value)}
            />
          </div>

          <div className="nw-group">
            <label>Furnishing</label>
            <PillGroup
              options={FURNISHING_OPTIONS}
              value={filters.furnishing}
              onChange={(value) => updateFilter("furnishing", value)}
            />
          </div>

          <div className="nw-group">
            <label>Amenities</label>
            <div className="nw-pills">
              {AMENITY_OPTIONS.map((amenity) => (
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
                {isLoading
                  ? "Loading properties..."
                  : `${visibleProperties.length} of ${properties.length} properties`}
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
                onClick={toggleSavedView}
              >
                ♥ Saved ({favorites.length})
              </button>

              <select
                value={sortBy}
                onChange={(e) => changeSort(e.target.value)}
              >
                <option value="recommended">Sort: Top Rated</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>

            </div>

          </div>


          {/* Saved homes dashboard (works like a shopping cart summary) */}

          {showFavorites && savedSummary.count > 0 && (
            <div className="nw-saved-summary">

              <div>
                <small>Saved homes</small>
                <strong>{savedSummary.count}</strong>
              </div>

              <div>
                <small>Combined rent / month</small>
                <strong>{formatPrice(savedSummary.total)}</strong>
              </div>

              <div>
                <small>Average rent</small>
                <strong>{formatPrice(savedSummary.average)}</strong>
              </div>

              <button
                type="button"
                onClick={() => dispatch(clearFavorites())}
              >
                Clear saved
              </button>

            </div>
          )}


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


          {isLoading ? (

            /* LOADING STATE */

            <div className="nw-grid" role="status" aria-label="Loading properties">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <PropertySkeleton key={item} />
              ))}
            </div>

          ) : status === "failed" ? (

            /* ERROR STATE */

            <div className="nw-empty nw-error-state" role="alert">

              <div className="nw-empty-icon">⚠️</div>

              <h3>Something went wrong</h3>

              <p>{error}</p>

              <button
                type="button"
                onClick={() => dispatch(fetchProperties())}
              >
                Try Again
              </button>

            </div>

          ) : visibleProperties.length === 0 ? (

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
                  onFavorite={handleFavorite}
                  onOpen={openProperty}
                />
              ))}

            </div>

          )}

        </main>

      </div>


      {propertyId && status === "succeeded" && (
        selectedProperty ? (
          <PropertyModal
            key={selectedProperty.id}
            property={selectedProperty}
            favorite={favorites.includes(selectedProperty.id)}
            onFavorite={handleFavorite}
            onClose={closeModal}
          />
        ) : (
          <MissingPropertyModal onClose={closeModal} />
        )
      )}

    </>
  );
}

export default Results;