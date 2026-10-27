import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "../pages/results.css";

import { selectFavoriteIds } from "../store/buyerStore";

/* =========================================================
   BUYER LAYOUT  (shared page structure for every buyer page)

   Used as a layout route in App.jsx:

     <Route element={<BuyerLayout />}>
       <Route path="/buyer" ... />
       <Route path="/results/:propertyId?" ... />
     </Route>

   The top bar is written once here; each buyer page renders
   inside <Outlet />.
========================================================= */

function BuyerLayout() {

  const location = useLocation();

  // A number, so this only re-renders when the count changes
  const savedCount = useSelector(
    (state) => selectFavoriteIds(state).length
  );

  const onResults = location.pathname.startsWith("/results");

  const savedView =
    onResults &&
    new URLSearchParams(location.search).get("saved") === "1";

  return (

    <div className="nw-page">

      <nav className="nw-topbar" aria-label="Buyer navigation">

        <Link to="/" className="nw-logo">NestWise</Link>

        <div className="nw-topbar-links">

          <Link to="/">Home</Link>

          <NavLink to="/buyer" end>
            Preferences
          </NavLink>

          <Link
            to="/results"
            className={onResults && !savedView ? "active" : ""}
          >
            Browse Homes
          </Link>

          <Link
            to={{ pathname: "/results", search: "?saved=1" }}
            className={savedView ? "active" : ""}
          >
            ♥ Saved ({savedCount})
          </Link>

          <Link to="/seller">Sell / Rent Out</Link>

        </div>

      </nav>

      <Outlet />

    </div>

  );
}

export default BuyerLayout;