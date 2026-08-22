import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BuyerPage from "./pages/BuyerPage";
import ListProperty from "./pages/ListProperty";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/buyer" element={<BuyerPage />} />

        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/results" element={<Results />} />


      </Routes>

    </BrowserRouter>
  );
}

export default App;