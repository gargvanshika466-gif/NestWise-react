import { useState } from "react";
import { useSeller } from "../../Content/SellerContext";
import "./Status.css";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f0eaff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='30' fill='%23c4b5e8'%3E🏠%3C/text%3E%3C/svg%3E";

function Status() {
  const { properties } = useSeller();
  const [filter, setFilter] = useState("All");

  const filteredProperties =
    filter === "All"
      ? properties
      : properties.filter((property) => property.status === filter);

  return (
    <section className="property-status-page">

      <div className="status-header">
        <h1>Property Status</h1>
        <p>Track the status of your listed properties.</p>
      </div>


      {/* Status Summary */}
      <div className="status-summary">

        <div className="status-summary-card">
          <h3>All</h3>
          <p>{properties.length}</p>
        </div>

        <div className="status-summary-card status-s-published">
          <h3>Published</h3>
          <p>{properties.filter((p) => p.status === "Published").length}</p>
        </div>

        <div className="status-summary-card status-s-pending">
          <h3>Pending</h3>
          <p>{properties.filter((p) => p.status === "Pending").length}</p>
        </div>

        <div className="status-summary-card status-s-draft">
          <h3>Draft</h3>
          <p>{properties.filter((p) => p.status === "Draft").length}</p>
        </div>

      </div>


      {/* Filters */}
      <div className="status-filters">
        {["All", "Published", "Pending", "Draft"].map((status) => (
          <button
            key={status}
            className={filter === status ? "filter-button active" : "filter-button"}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>


      {/* Property List */}
      <div className="status-property-list">

        {filteredProperties.length === 0 ? (

          <div className="no-status-properties">
            <h2>No Properties Found</h2>
            <p>There are no properties in this status.</p>
          </div>

        ) : (

          filteredProperties.map((property) => (

            <div className="status-property-card" key={property.id}>

              <div className="status-card-img">
                <img
                  src={property.image || PLACEHOLDER_IMAGE}
                  alt={property.title}
                  onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                />
              </div>

              <div className="status-card-info">
                <h2>{property.title}</h2>
                <p>
                  📍 {[property.location, property.city].filter(Boolean).join(", ")}
                </p>
                <p>₹{
                  property.listingType === "sale"
                    ? `${Number(property.salePrice).toLocaleString("en-IN")} (Sale)`
                    : `${Number(property.rent).toLocaleString("en-IN")} / month`
                }</p>
              </div>

              <span
                className={`status-label ${property.status ? property.status.toLowerCase() : ""}`}
              >
                {property.status}
              </span>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default Status;