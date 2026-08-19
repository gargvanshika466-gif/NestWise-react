import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuyerPage from "./pages/BuyerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/buyer" element={<BuyerPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;