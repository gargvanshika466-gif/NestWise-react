import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'


function Home() {
  return (
    <div className="home-page">

      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">

          <p className="small-heading">
            SMART. SIMPLE. STUDENT LIVING.
          </p>

          <h1>
            Find Your Perfect
            <span>Student Home</span>
          </h1>

          <p className="hero-text">
            Find affordable flats, apartments, PGs and shared
            accommodations near your university.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search by location, university or property type..."
            />

            <button>Search</button>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
            alt="Student accommodation"
          />

        </div>

      </section>


      {/* USER OPTIONS */}
      <section className="user-options">

        <div className="option-card">

          <div className="option-icon">
            🎓
          </div>

          <h3>I'm a Student</h3>

          <p>
            Find affordable accommodation near your campus.
          </p>

          <Link to="/buyer">
          <button>
            Search Now
          </button>
          </Link>

        </div>


        <div className="option-card">

          <div className="option-icon">
            🏠
          </div>

          <h3>I'm a Property Owner</h3>

          <p>
            List your property and connect with students.
          </p>

          <Link to="/list-property">
            <button>
              List Property
            </button>
          </Link>

        </div>

      </section>


      {/* WHY NESTWISE */}
      <section className="why-section">

        <p className="section-label">
          WHY NESTWISE
        </p>

        <h2>
          Everything You Need to Find Your Home
        </h2>

        <div className="why-cards">

          <div className="why-card">

            <div className="why-icon">
              ✓
            </div>

            <h3>
              Verified Listings
            </h3>

            <p>
              Safe and reliable properties for students.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              ♧
            </div>

            <h3>
              Student Friendly
            </h3>

            <p>
              Designed specifically around student needs.
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
              Discover homes that match your preferences.
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
              A trusted platform for students and owners.
            </p>

          </div>

        </div>

      </section>


      
      <section className="cta-section">

        

        

      </section>


      {/* FOOTER */}
      

        

      

    </div>
  )
}

export default Home