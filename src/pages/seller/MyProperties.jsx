import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSeller } from "../../Content/SellerContext";
import "./MyProperties.css";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220' viewBox='0 0 400 220'%3E%3Crect width='400' height='220' fill='%23f0eaff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='%23c4b5e8'%3E🏠%3C/text%3E%3C/svg%3E";

const FILTERS = ["All", "Published", "Pending", "Draft"];

function MyProperties() {
  const navigate = useNavigate();
  const { properties, deleteProperty } = useSeller();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = properties.filter((p) => {
    const matchFilter =
      activeFilter === "All" || p.status === activeFilter;

    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      (p.city && p.city.toLowerCase().includes(q));

    return matchFilter && matchSearch;
  });

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (confirmDelete) {
      deleteProperty(id);
    }
  }

  function statusColor(status) {
    if (!status) return "";
    return status.toLowerCase();
  }

  return (
    <section className="my-properties">

      <div className="properties-header">
        <div>
          <h1>My Properties</h1>
          <p>Manage all your listed properties from here.</p>
        </div>

        <button
          onClick={() => navigate("/seller/publish")}
          className="add-property-button"
        >
          ＋ Add Property
        </button>
      </div>


      {/* Search & Filters */}
      <div className="properties-controls">

        <div className="properties-search-wrap">
          
          <input
            type="text"
            className="properties-search"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="properties-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? "filter-pill-active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

      </div>


      {/* Empty State */}
      {properties.length === 0 ? (
        <div className="empty-properties">
          <div className="empty-icon">🏘️</div>
          <h2>No Properties Listed</h2>
          <p>You haven't published any property yet.</p>
          <button onClick={() => navigate("/seller/publish")}>
            ＋ Publish Your First Property
          </button>
        </div>

      ) : filtered.length === 0 ? (
        <div className="empty-properties">
          <div className="empty-icon">🔍</div>
          <h2>No Results Found</h2>
          <p>Try changing your search or filter.</p>
        </div>

      ) : (
        <div className="properties-grid">
          {filtered.map((property) => (
            <div className="property-card" key={property.id}>

              {/* Card Image */}
              <div className="property-card-image">
                <img
                  src={property.image || PLACEHOLDER_IMAGE}
                  alt={property.title}
                  onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                />
                <span
                  className={`property-badge ${statusColor(property.status)}`}
                >
                  {property.status}
                </span>
              </div>

              {/* Card Body */}
              <div className="property-card-body">

                <div className="property-card-top">
                  <div>
                    <h2 className="property-card-title">{property.title}</h2>
                    <span className="property-card-type">{property.type}</span>
                  </div>
                </div>

                <p className="property-card-location">
                  📍 {property.location}{property.city ? `, ${property.city}` : ""}
                </p>

                <div className="property-card-price-row">
                  <span className={`listing-type-badge ${property.listingType === "sale" ? "badge-sale" : "badge-rent"}`}>
                    {property.listingType === "sale" ? "🏷️ For Sale" : "🏠 For Rent"}
                  </span>
                  <p className="property-card-rent">
                    {property.listingType === "sale"
                      ? `₹${Number(property.salePrice).toLocaleString("en-IN")}`
                      : `₹${Number(property.rent).toLocaleString("en-IN")}/month`}
                  </p>
                </div>

                <div className="property-card-meta">
                  {property.bedrooms && (
                    <span> {property.bedrooms} Bed</span>
                  )}
                  {property.bathrooms && (
                    <span> {property.bathrooms} Bath</span>
                  )}
                  {property.area && (
                    <span>{property.area} sq.ft</span>
                  )}
                </div>

              </div>

              {/* Card Actions */}
              <div className="property-card-actions">
                

                <button
                  className="btn-edit"
                  onClick={() => navigate(`/seller/properties/${property.id}/edit`)}
                >
                   Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(property.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}

export default MyProperties;