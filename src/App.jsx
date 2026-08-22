import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BuyerPage from "./pages/BuyerPage";
import SellerPage from "./pages/SellerPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/buyer" element={<BuyerPage />} />

        <Route path="/seller" element={<SellerPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;