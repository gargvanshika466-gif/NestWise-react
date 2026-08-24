import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'

function Home() {
  return (
    <div className="home-page">

      <Navbar />

    
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="small-heading">
            FIND YOUR PERFECT HOME
          </p>

          <h1>
            Find Your Perfect
            <span> Home with NestWise</span>
          </h1>

          <p className="hero-text">
            Discover affordable and verified homes 
             find a place that feels like home.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search location or property..."
            />

            <button>Search</button>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
            alt="Modern home"
          />

        </div>

      </section>

      <section className="why-section">

        <p className="section-label">
          WHY NESTWISE
        </p>

        <h2>
          Everything You Need to Find Your Home
        </h2>

        <p className="section-text">
          Simple, safe housing made easy.
        </p>

        <div className="why-cards">

          <div className="why-card">

            <div className="why-icon">
              ✓
            </div>

            <h3>
              Verified Listings
            </h3>

            <p>
              Safe and reliable properties .
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              ♧
            </div>

            <h3>
              User Friendly
            </h3>

            <p>
              Properties selected according to user needs.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              ★
            </div>

            <h3>
              Smart Matching
            </h3>

            <p>
              Find homes that match your preferences.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              🔒
            </div>

            <h3>
              Safe & Secure
            </h3>

            <p>
              A trusted platform for you.
            </p>

          </div>

        </div>

      </section>


      
      <section className="featured-section" id="properties">

        <p className="section-label">
          FEATURED HOMES
        </p>

        <h2>
          Popular  Properties
        </h2>

        <p className="section-text">
          Explore comfortable and affordable homes .
        </p>

        <div className="property-cards">

          <div className="property-card">

            <img
              src="https://st.hzcdn.com/simgs/pictures/bedrooms/apartment-with-traditional-indian-interior-abhishek-shah-img~7c61ffe70e830d81_9-2435-1-f9e2591.jpg"
              alt="Modern student apartment"
            />

            <div className="property-info">

              <h3>
                Modern Apartment
              </h3>

              <p>
                Near Chitkara University
              </p>

              <div className="property-details">
                <span>2 Beds</span>
                <span>2 Baths</span>
              </div>

              <h4>
                ₹12,000 / month
              </h4>

            </div>

          </div>


          <div className="property-card">

            <img
              src="https://i.pinimg.com/originals/21/83/24/2183245b937f1ce26e10805b204354ca.jpg"
              alt="Comfortable PG room"
            />

            <div className="property-info">

              <h3>
                Comfortable PG Room
              </h3>

              <p>
                Near University Campus
              </p>

              <div className="property-details">
                <span>1 Bed</span>
                <span>1 Bath</span>
              </div>

              <h4>
                ₹8,500 / month
              </h4>

            </div>

          </div>


          <div className="property-card">

            <img
              src="https://dressyourhome.in/wp-content/uploads/IMG-3220.jpg"
              alt="Spacious shared flat"
            />

            <div className="property-info">

              <h3>
                Spacious Shared Flat
              </h3>

              <p>
                Rajpura, Punjab
              </p>

              <div className="property-details">
                <span>3 Beds</span>
                <span>2 Baths</span>
              </div>

              <h4>
                ₹15,000 / month
              </h4>

            </div>

          </div>

        </div>

      </section>


    
      <section className="about-section" id="about">

        <div className="about-content">

          <p className="section-label">
            ABOUT NESTWISE
          </p>

          <h2>
            Making Your Living Simple
          </h2>

          <p>
            Finding a comfortable and affordable place near
            NestWise makes this
            process simple by bringing 
            properties together in one place.
          </p>

          <div className="about-points">

            <div>
              <h3>
                Affordable
              </h3>

              <p>
                Homes that fit a user's budget.
              </p>
            </div>


            <div>
              <h3>
                Convenient
              </h3>

              <p>
                Find properties close to your campus.
              </p>
            </div>


            <div>
              <h3>
                Reliable
              </h3>

              <p>
                Discover safe and verified listings.
              </p>
            </div>

          </div>

        </div>


        <div className="about-image">

          <img
            src="https://media.designcafe.com/wp-content/uploads/2021/04/28110847/middle-class-indian-bedroom-design.jpg"
            alt="Comfortable student home"
          />

        </div>

      </section>


      
      <section className="reviews-section">

        <p className="section-label">
          WHAT USERS SAY
        </p>

        <h2>
          Our Users Love NestWise
        </h2>

        <div className="review-cards">

          <div className="review-card">

            <div className="stars">
              ★★★★★
            </div>

            <p>
              "NestWise made it really easy for me to find
              a comfortable place near my university."
            </p>

            <h3>
              Aarav
            </h3>

            <span>
              User
            </span>

          </div>


          <div className="review-card">

            <div className="stars">
              ★★★★★
            </div>

            <p>
              "The property options were simple to understand
              and helped me find a place within my budget."
            </p>

            <h3>
              Simran
            </h3>

            <span>
              User
            </span>

          </div>


          <div className="review-card">

            <div className="stars">
              ★★★★★
            </div>

            <p>
              "A simple and useful platform for users
              looking for accommodation."
            </p>

            <h3>
              Rahul
            </h3>

            <span>
              User
            </span>

          </div>

        </div>

      </section>


    
      <section className="contact-section" id="contact">

        <div className="contact-content">

          <p className="section-label">
            CONTACT US
          </p>

          <h2>
            Have Questions?
          </h2>

          <p>
            Our team is here to help you find your perfect home.
          </p>

          <div className="contact-details">

            <div>
              <strong>Email</strong>
              <p>support@nestwise.com</p>
            </div>

            <div>
              <strong>Phone</strong>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <strong>Location</strong>
              <p>Punjab, India</p>
            </div>

          </div>

        </div>

      </section>


      <footer className="footer">

        <div className="footer-content">

          <div>

            <h2>
              NestWise
            </h2>

            <p>
              Smart. Simple. Student Living.
            </p>

          </div>


          <div className="footer-links">

            <a href="#home">
              Home
            </a>

            <a href="#about">
              About
            </a>

            <a href="#properties">
              Properties
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>

        </div>

        <p className="copyright">
          © 2026 NestWise. All rights reserved.
        </p>

      </footer>

    </div>
  )
}

export default Home