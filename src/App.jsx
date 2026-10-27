import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Provider } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SellerPage from "./pages/SellerPage";
import ListProperty from "./pages/ListProperty";
import BuyerPage from "./pages/BuyerPage";
import Results from "./pages/Results";

import BuyerLayout from "./components/BuyerLayout";
import { BuyerProvider } from "./context/BuyerContext";
import { store } from "./store/buyerStore";

function App() {
  return (

    // Redux store + Buyer context are available to every page
    <Provider store={store}>
      <BuyerProvider>

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
              path="/seller"
              element={<SellerPage />}
            />

            <Route
              path="/list-property"
              element={<ListProperty />}
            />

            {/* Buyer pages share one layout (top bar + Outlet) */}
            <Route element={<BuyerLayout />}>

              <Route
                path="/buyer"
                element={<BuyerPage />}
              />

              {/* /results            -> list of homes
                  /results/3          -> same page with home #3 open */}
              <Route
                path="/results/:propertyId?"
                element={<Results />}
              />

            </Route>

          </Routes>

        </BrowserRouter>

      </BuyerProvider>
    </Provider>

  );
}

export default App;