import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <p className="small-heading">SMART. SIMPLE. STUDENT LIVING.</p>

          <h1>
            Find Your Perfect
            <span> Student Home</span>
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
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
            alt="Student accommodation"
          />
        </div>
      </section>

      <section className="user-options">
        <div className="option-card">
          <div className="option-icon">🎓</div>
          <h3>I'm a Student</h3>
          <p>Find affordable accommodation near your campus.</p>
          <button>Search Now</button>
        </div>

        <div className="option-card">
          <div className="option-icon">🏠</div>
          <h3>I'm a Property Owner</h3>
          <p>List your property and connect with students.</p>
          <button>List Property</button>
        </div>
      </section>

      <section className="why-section">
        <h2>Why Choose NestWise?</h2>

        <div className="why-cards">
          <div>
            <span>✓</span>
            <h3>Verified Listings</h3>
            <p>Safe and reliable properties.</p>
          </div>

          <div>
            <span>♧</span>
            <h3>Student Friendly</h3>
            <p>Designed for student needs.</p>
          </div>

          <div>
            <span>★</span>
            <h3>Best Match Score</h3>
            <p>Find homes that suit you.</p>
          </div>

          <div>
            <span>🔒</span>
            <h3>Safe & Secure</h3>
            <p>A trusted housing platform.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home