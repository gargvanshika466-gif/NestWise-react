import { useNavigate } from "react-router-dom";
import { useSeller } from "../../Content/SellerContext";
import "./Dashboard.css";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f0eaff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='30' fill='%23c4b5e8'%3E🏠%3C/text%3E%3C/svg%3E";

function Dashboard() {
  const navigate = useNavigate();
  const { properties } = useSeller();

  const totalProperties = properties.length;
  const publishedProperties = properties.filter((p) => p.status === "Published").length;
  const pendingProperties = properties.filter((p) => p.status === "Pending").length;
  const draftProperties = properties.filter((p) => p.status === "Draft").length;

  const recentProperties = [...properties].slice(-5).reverse();

  return (
    <section className="dashboard">

      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>
        <p>Welcome back! Manage your properties from here.</p>
      </div>


      {/* Statistics */}
      <div className="seller-stats">

        <div className="stat-card">
          <div className="stat-icon">🏘️</div>
          <h3>Total Properties</h3>
          <p>{totalProperties}</p>
        </div>

        <div className="stat-card stat-published">
          <div className="stat-icon">✅</div>
          <h3>Published</h3>
          <p>{publishedProperties}</p>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">⏳</div>
          <h3>Pending</h3>
          <p>{pendingProperties}</p>
        </div>

        <div className="stat-card stat-draft">
          <div className="stat-icon">📝</div>
          <h3>Draft</h3>
          <p>{draftProperties}</p>
        </div>

      </div>


      {/* Quick Actions */}
      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-buttons">

          <button
            className="action-btn action-btn-primary"
            onClick={() => navigate("/seller/publish")}
          >
            Publish New Property
          </button>

          <button
            className="action-btn action-btn-secondary"
            onClick={() => navigate("/seller/properties")}
          >
            View My Properties
          </button>

        </div>

      </div>


      {/* Recent Properties */}
      <div className="recent-activity">

        <h2>Recent Properties</h2>

        {recentProperties.length === 0 ? (

          <div className="empty-recent">
            <div className="empty-recent-icon">📋</div>
            <p>No property activity yet. Start by publishing a property.</p>
          </div>

        ) : (

          <div className="recent-list">
            {recentProperties.map((property) => (
              <div
                className="recent-property"
                key={property.id}
                onClick={() => navigate(`/seller/properties/${property.id}`)}
              >

                <div className="recent-property-img">
                  <img
                    src={property.image || PLACEHOLDER_IMAGE}
                    alt={property.title}
                    onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                  />
                </div>

                <div className="recent-property-info">
                  <h3>{property.title}</h3>
                  <p className="recent-location">
                    📍 {[property.location, property.city].filter(Boolean).join(", ")}
                  </p>
                  <p className="recent-rent">
                    {property.listingType === "sale"
                      ? `₹${Number(property.salePrice).toLocaleString("en-IN")} (Sale)`
                      : `₹${Number(property.rent).toLocaleString("en-IN")}/month`}
                  </p>
                </div>

                <span
                  className={`property-status ${property.status ? property.status.toLowerCase() : ""}`}
                >
                  {property.status}
                </span>

              </div>
            ))}
          </div>

        )}

      </div>

    </section>
  );
}

export default Dashboard;