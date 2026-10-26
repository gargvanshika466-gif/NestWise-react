import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ListProperty from "./pages/ListProperty";
import Results from "./pages/Results";

import { SellerProvider } from "./Content/SellerContext";

import SellerPage from "./pages/seller/SellerPage";
import Dashboard from "./pages/seller/Dashboard";
import PublishProperty from "./pages/seller/PublishProperty";
import MyProperties from "./pages/seller/MyProperties";
import Status from "./pages/seller/Status";
import EditProperty from "./pages/seller/EditProperty";


function App() {
  return (
    <SellerProvider>

      <BrowserRouter>

        <Routes>

          {/* Existing Pages */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/buyer"
            element={<Navigate to="/results" replace />}
          />

          <Route
            path="/list-property"
            element={<ListProperty />}
          />

          <Route
            path="/results"
            element={<Results />}
          />


          {/* Seller Pages */}

          <Route
            path="/seller"
            element={<SellerPage />}
          >

            <Route
              index
              element={
                <Navigate
                  to="dashboard"
                  replace
                />
              }
            />

            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            <Route
              path="publish"
              element={<PublishProperty />}
            />

            <Route
              path="properties"
              element={<MyProperties />}
            />

            <Route
              path="status"
              element={<Status />}
            />

            <Route
              path="properties/:id/edit"
              element={<EditProperty />}
            />

          </Route>

        </Routes>

      </BrowserRouter>

    </SellerProvider>
  );
}

export default App;