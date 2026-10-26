import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSeller } from "../../Content/SellerContext";
import "./SellerPage.css";

function SellerPage() {
  const navigate = useNavigate();
  const { sellerLogout } = useSeller();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    sellerLogout();
    setDropdownOpen(false);
    navigate("/");
  }

  function handleProfileClick() {
    setDropdownOpen(false);
    navigate("/seller/profile");
  }

  return (
    <div className="seller-page">

      <aside className="seller-sidebar">

        <div className="seller-logo">
          <h1>NestWise</h1>
          <p>Seller Panel</p>
        </div>


        <nav className="seller-nav">

          <NavLink
            to="/seller/dashboard"
            className={({ isActive }) =>
              isActive ? "seller-nav-link active" : "seller-nav-link"
            }
          >
            <span className="nav-icon">🏠</span>
            Dashboard
          </NavLink>


          <NavLink
            to="/seller/publish"
            className={({ isActive }) =>
              isActive ? "seller-nav-link active" : "seller-nav-link"
            }
          >
            <span className="nav-icon">➕</span>
            Publish Property
          </NavLink>


          <NavLink
            to="/seller/properties"
            className={({ isActive }) =>
              isActive ? "seller-nav-link active" : "seller-nav-link"
            }
          >
            <span className="nav-icon">🏢</span>
            My Properties
          </NavLink>


          <NavLink
            to="/seller/status"
            className={({ isActive }) =>
              isActive ? "seller-nav-link active" : "seller-nav-link"
            }
          >
            <span className="nav-icon">📊</span>
            Status
          </NavLink>

        </nav>


        {/* Account Section with Dropdown */}
        <div className="seller-account-wrap" ref={dropdownRef}>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="seller-account-dropdown">
              <button
                className="seller-dropdown-item"
                onClick={handleProfileClick}
              >
                <span>👤</span>
                <span>Seller Profile</span>
              </button>
              <div className="seller-dropdown-divider" />
              <button
                className="seller-dropdown-item seller-dropdown-logout"
                onClick={handleLogout}
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Footer Trigger */}
          <button
            className="seller-sidebar-footer"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <div className="seller-account-avatar">
              👤
            </div>
            <div className="seller-account-info">
              <p>Seller Account</p>
              <span>Manage your profile</span>
            </div>
            <span className={`seller-account-arrow${dropdownOpen ? " arrow-up" : ""}`}>
              ›
            </span>
          </button>

        </div>

      </aside>


      <main className="seller-content">
        <Outlet />
      </main>

    </div>
  );
}

export default SellerPage;