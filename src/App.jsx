import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Provider } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ListProperty from "./pages/ListProperty";
import BuyerPage from "./pages/BuyerPage";
import Results from "./pages/Results";

import BuyerLayout from "./components/BuyerLayout";
import { BuyerProvider } from "./context/BuyerContext";
import { store } from "./store/buyerStore";

import { SellerProvider } from "./Content/SellerContext";

import SellerPage from "./pages/seller/SellerPage";
import Dashboard from "./pages/seller/Dashboard";
import PublishProperty from "./pages/seller/PublishProperty";
import MyProperties from "./pages/seller/MyProperties";
import Status from "./pages/seller/Status";
import EditProperty from "./pages/seller/EditProperty";

function App() {
  return (
    <Provider store={store}>
      <BuyerProvider>
        <SellerProvider>

          <BrowserRouter>

            <Routes>

              {/* Home */}
              <Route
                path="/"
                element={<Home />}
              />

              {/* Login */}
              <Route
                path="/login"
                element={<Login />}
              />

              {/* Signup */}
              <Route
                path="/signup"
                element={<Signup />}
              />

              {/* ================= BUYER ================= */}

              {/* Buyer main page */}
              <Route element={<BuyerLayout />}>

                <Route
                  path="/buyer"
                  element={<BuyerPage />}
                />

                {/* Results page
                    /results
                    /results/3
                */}
                <Route
                  path="/results/:propertyId?"
                  element={<Results />}
                />

              </Route>

              {/* ================= OTHER PAGES ================= */}

              <Route
                path="/list-property"
                element={<ListProperty />}
              />

              {/* ================= SELLER ================= */}

              <Route
                path="/seller"
                element={<SellerPage />}
              >

                {/* /seller -> /seller/dashboard */}
                <Route
                  index
                  element={
                    <Navigate
                      to="dashboard"
                      replace
                    />
                  }
                />

                {/* Seller Dashboard */}
                <Route
                  path="dashboard"
                  element={<Dashboard />}
                />

                {/* Publish Property */}
                <Route
                  path="publish"
                  element={<PublishProperty />}
                />

                {/* My Properties */}
                <Route
                  path="properties"
                  element={<MyProperties />}
                />

                {/* Status */}
                <Route
                  path="status"
                  element={<Status />}
                />

                {/* Edit Property */}
                <Route
                  path="properties/:id/edit"
                  element={<EditProperty />}
                />

              </Route>

            </Routes>

          </BrowserRouter>

        </SellerProvider>
      </BuyerProvider>
    </Provider>
  );
}

export default App;