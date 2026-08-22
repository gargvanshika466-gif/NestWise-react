import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BuyerPage from "./pages/BuyerPage";
import SellerPage from "./pages/SellerPage";
import ListProperty from "./pages/ListProperty";
import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <section className="hero" id="home">
        <div className="hero-text">
          <p className="welcome">WELCOME TO NESTWISE</p>

          <h1>
            Find a place
            <br />
            you'll feel at home.
          </h1>

          <p className="hero-description">
            Find comfortable and affordable accommodation
            that matches your needs. Choose from PGs, flats,
            apartments and shared rooms.
          </p>

          <button className="hero-btn">
            Find Accommodation
          </button>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
            alt="Home interior"
          />
        </div>
      </section>

      <section className="properties">
        <div className="section-title">
          <p>EXPLORE</p>
          <h2>Popular Properties</h2>
        </div>

        <div className="property-container">
          <div className="property-card">
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=700&q=80"
              alt="PG room"
            />

            <div className="property-info">
              <h3>Green Valley PG</h3>
              <p>📍 Chandigarh</p>

              <div className="details">
                <span>2 Beds</span>
                <span>2 Baths</span>
              </div>

              <div className="price">
                ₹8,000 / month
              </div>
            </div>
          </div>

          <div className="property-card">
            <img
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=700&q=80"
              alt="Apartment"
            />

            <div className="property-info">
              <h3>Urban Nest Apartment</h3>
              <p>📍 Mohali</p>

              <div className="details">
                <span>3 Beds</span>
                <span>2 Baths</span>
              </div>

              <div className="price">
                ₹12,000 / month
              </div>
            </div>
          </div>

          <div className="property-card">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80"
              alt="Shared accommodation"
            />

            <div className="property-info">
              <h3>Green View Residence</h3>
              <p>📍 Rajpura</p>

              <div className="details">
                <span>4 Beds</span>
                <span>2 Baths</span>
              </div>

              <div className="price">
                ₹6,500 / month
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
            alt="People"
          />
        </div>

        <Route path="/buyer" element={<BuyerPage />} />

        <Route path="/list-property" element={<ListProperty />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;