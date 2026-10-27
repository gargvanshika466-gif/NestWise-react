import { NavLink, Outlet } from "react-router-dom";
import "./SellerPage.css";

function SellerPage() {
  return (
    <div className="seller-page">

      {/* Sidebar */}
      <aside className="seller-sidebar">

        <div className="seller-logo">
          <h2>NestWise</h2>
          <p>Seller Panel</p>
        </div>

        <nav className="seller-nav">

          <NavLink to="/seller/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/seller/publish">
            Publish Property
          </NavLink>

          <NavLink to="/seller/properties">
            My Properties
          </NavLink>

          <NavLink to="/seller/status">
            Status
          </NavLink>

        </nav>

      </aside>


      {/* Page Content */}
      <main className="seller-content">
        <Outlet />
      </main>

    </div>
  );
}

export default SellerPage;
