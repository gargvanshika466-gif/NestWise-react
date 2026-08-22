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

        <div className="about-text">
          <p className="section-small-title">
            ABOUT NESTWISE
          </p>

          <h2>
            Making housing
            <br />
            simple and easy.
          </h2>

          <p>
            NestWise is a housing platform that helps people
            find suitable accommodation according to their
            needs and preferences.
          </p>

          <p>
            Whether you are looking for a PG, flat, apartment
            or shared room, NestWise makes the process easier
            and more convenient.
          </p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-title">
          <p>HOW IT WORKS</p>
          <h2>Finding a home is easy</h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">
              01
            </div>

            <h3>Search</h3>

            <p>
              Look for accommodation in your preferred
              location.
            </p>
          </div>

          <div className="step">
            <div className="step-number">
              02
            </div>

            <h3>Explore</h3>

            <p>
              Check property details, images,
              rent and facilities.
            </p>
          </div>

          <div className="step">
            <div className="step-number">
              03
            </div>

            <h3>Choose</h3>

            <p>
              Select the property that suits
              your requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="owner">
        <div>
          <p className="section-small-title">
            FOR PROPERTY OWNERS
          </p>

          <h2>
            Have a property to rent?
          </h2>

          <p>
            List your property on NestWise and
            connect with people looking for
            suitable accommodation.
          </p>

          <button className="owner-btn">
            List Your Property
          </button>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-title">
          <p>CONTACT</p>
          <h2>Get in touch with us</h2>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>

            <p>📧 support@nestwise.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Punjab, India</p>
          </div>

          <div className="contact-form">
            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <textarea
              placeholder="Your Message"
              rows="5"
            ></textarea>

            <button>
              Send Message
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">
          NestWise
        </div>

        <p>
          Making housing simple and easy.
        </p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <p className="copyright">
          © 2026 NestWise. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;