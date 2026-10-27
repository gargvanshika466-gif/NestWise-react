import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard">

      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>
        <p>
          Welcome back! Manage your properties from here.
        </p>
      </div>


      <div className="seller-stats">

        <div className="stat-card">
          <h3>Total Properties</h3>
          <p>0</p>
        </div>

        <div className="stat-card">
          <h3>Published</h3>
          <p>0</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>0</p>
        </div>

      </div>


      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <button>
          + Publish New Property
        </button>

        <button>
          View My Properties
        </button>

      </div>


      <div className="recent-activity">

        <h2>Recent Activity</h2>

        <p>
          No property activity yet.
        </p>

      </div>

    </section>
  );
}

export default Dashboard;
