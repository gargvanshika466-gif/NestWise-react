import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SellerPage from "./pages/SellerPage";
import ListProperty from "./pages/ListProperty";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>

      <Routes>

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
          element={
            <Navigate
              to="/results"
              replace
            />
          }
        />

        <Route
          path="/seller"
          element={<SellerPage />}
        />

        <Route
          path="/list-property"
          element={<ListProperty />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;