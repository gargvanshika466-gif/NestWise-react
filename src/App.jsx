import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import BuyerPage from "./pages/BuyerPage";
import SellerPage from "./pages/SellerPage";
import ListProperty from "./pages/ListProperty";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Buyer & Seller */}
        <Route path="/buyer" element={<BuyerPage />} />
        <Route path="/seller" element={<SellerPage />} />

        {/* Property Listing */}
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/results" element={<Results />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;