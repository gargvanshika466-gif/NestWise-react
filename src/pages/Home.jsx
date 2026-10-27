import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './home.css'

const PROPERTIES = [
  {
    id: 1,
    badge: 'FOR RENT',
    price: '₹55,000/mo',
    title: 'Sunlit 3BHK in Indiranagar',
    location: 'Indiranagar, Bangalore',
    beds: 3, baths: 2, sqft: '1,450',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    badge: 'FOR RENT',
    price: '₹32,000/mo',
    title: 'Modern 2BHK near Hitech City',
    location: 'Gachibowli, Hyderabad',
    beds: 2, baths: 2, sqft: '1,080',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    badge: 'FOR SALE',
    price: '₹2.65 Cr',
    title: 'Sea-facing 3BHK in Bandra West',
    location: 'Bandra West, Mumbai',
    beds: 3, baths: 3, sqft: '1,650',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    badge: 'FOR RENT',
    price: '₹28,000/mo',
    title: 'Quiet 2BHK in Koregaon Park',
    location: 'Koregaon Park, Pune',
    beds: 2, baths: 2, sqft: '980',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    badge: 'FOR SALE',
    price: '₹1.85 Cr',
    title: 'Garden villa with private lawn',
    location: 'Whitefield, Bangalore',
    beds: 4, baths: 4, sqft: '2,850',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    badge: 'FOR RENT',
    price: '₹19,500/mo',
    title: 'Studio loft in Anna Nagar',
    location: 'Anna Nagar, Chennai',
    beds: 1, baths: 1, sqft: '620',
    img: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80',
  },
]

const CITIES = [
  { name: 'Bangalore', homes: 3, color: '#FCE7F0' },
  { name: 'Hyderabad', homes: 2, color: '#D8F956' },
  { name: 'Pune',      homes: 2, color: '#E6F7EB' },
  { name: 'Mumbai',    homes: 2, color: '#E3EFFD' },
  { name: 'Chennai',   homes: 2, color: '#FEF3D6' },
  { name: 'Delhi NCR', homes: 1, color: '#F4F5F9' },
]

function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate('/results')
  }

  return (
    <div className="home-page">

      {/* ── NAVBAR ── */}
      <nav className="navbar" id="home">

        <div className="logo">
          <span className="logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z"/>
              <path d="M9 21V12h6v9"/>
            </svg>
          </span>
          NestWise
        </div>

        <div className="nav-links">
          <Link to="/results">Browse homes</Link>
          <a href="#how-it-works">How it works</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login"  className="login-btn">Log in</Link>
          <Link to="/signup" className="signup-btn">Register</Link>
          <Link to="/list-property" className="list-nav-btn">List Property</Link>
          <button type="button" className="download-btn" onClick={() => alert('NestWise mobile app coming soon!')}>Download App</button>
        </div>

      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">

          <div className="hero-badge">
            <span className="badge-star">✨</span>
            Trusted &amp; loved by home seekers across India
          </div>

          <h1 className="hero-title">
            Find a home that<br />
            <span className="hero-highlight">feels like yours</span>
          </h1>

          <p className="hero-subtitle">
            Verified apartments to rent and buy across India's best cities —{' '}
            <span>honest prices, real photos,</span> and zero brokerage games.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <span className="search-pin">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#19873d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search Places..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </button>
          </form>

          <div className="top-cities-row">
            <span className="top-cities-label">Top Cities:</span>
            {['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Chennai', 'Delhi NCR'].map(city => (
              <Link key={city} to="/results" className="top-city-link">{city}</Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── FEATURED HOMES ── */}
      <section className="featured-section" id="properties">

        <div className="featured-header">
          <div>
            <p className="section-label">HANDPICKED</p>
            <h2>Featured homes</h2>
            <p className="section-text">
              Verified properties with real photography and clear pricing — ready to move into.
            </p>
          </div>
          <Link to="/results" className="view-all-btn">View all homes →</Link>
        </div>

        <div className="property-cards">
          {PROPERTIES.map(p => (
            <div key={p.id} className="property-card">
              <div className="card-image-wrap">
                <img src={p.img} alt={p.title} />
                <span className={`badge-type ${p.badge === 'FOR SALE' ? 'sale' : ''}`}>{p.badge}</span>
                <span className="badge-featured">Featured</span>
              </div>
              <div className="card-body">
                <div className="card-price">{p.price}</div>
                <div className="card-title">{p.title}</div>
                <div className="card-location">
                  <span className="loc-dot">📍</span> {p.location}
                </div>
                <div className="card-specs">
                  <span>🛏 {p.beds} Beds</span>
                  <span>🚿 {p.baths} Baths</span>
                  <span>📐 {p.sqft} sq.ft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section" id="how-it-works">

        <p className="section-label">HOW IT WORKS</p>
        <h2>Three steps to your next address</h2>
        <p className="section-text">
          NestWise keeps the whole journey simple, transparent and free of clutter.
        </p>

        <div className="how-cards">

          <div className="how-card">
            <div className="how-icon" style={{ background: '#FFE8F0' }}>🔍</div>
            <h3>Search</h3>
            <p>Tell us the city or locality you have in mind and see verified homes with real photos.</p>
          </div>

          <div className="how-card">
            <div className="how-icon" style={{ background: '#CCEF4C' }}>❤️</div>
            <h3>Shortlist</h3>
            <p>Compare rent, size and amenities side by side, then keep the handful you actually love.</p>
          </div>

          <div className="how-card">
            <div className="how-icon" style={{ background: '#E2F5E2' }}>📞</div>
            <h3>Contact</h3>
            <p>Reach the owner or our city partner directly — no middlemen, no brokerage surprises.</p>
          </div>

        </div>

      </section>

      {/* ── BUYER / SELLER OPTIONS ── */}
      <section className="options-section" id="about">

        <p className="section-label">GET STARTED</p>
        <h2>What brings you here?</h2>
        <p className="section-text">Whether you are searching for a home or listing one, we have you covered.</p>

        <div className="option-cards">

          <div className="option-card">
            <div className="option-icon">🏠</div>
            <h3>I'm Looking for a Home</h3>
            <p>Find verified flats, PGs, apartments and shared accommodations based on your preferences.</p>
            <Link to="/results">
              <button className="option-btn">Browse Properties</button>
            </Link>
          </div>

          <div className="option-card">
            <div className="option-icon">🏢</div>
            <h3>I'm a Property Owner</h3>
            <p>List your property for free and reach thousands of verified buyers and tenants near you.</p>
            <Link to="/list-property">
              <button className="option-btn">List My Property</button>
            </Link>
          </div>

        </div>

      </section>

      {/* ── BROWSE BY CITY ── */}
      <section className="cities-section">

        <p className="section-label">EXPLORE</p>
        <h2>Browse by city</h2>
        <p className="section-text">
          From tech corridors to quiet old neighbourhoods — pick a city and start looking.
        </p>

        <div className="cities-grid">
          {CITIES.map(c => (
            <Link
              key={c.name}
              to="/results"
              className="city-card"
              style={{ background: c.color }}
            >
              <strong>{c.name}</strong>
              <span>{c.homes} homes</span>
            </Link>
          ))}
        </div>

      </section>

      {/* ── REVIEWS ── */}
      <section className="reviews-section">

        <p className="section-label">WHAT USERS SAY</p>
        <h2>Our Users Love NestWise</h2>

        <div className="review-cards">

          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"NestWise made it really easy for me to find a comfortable place near my university."</p>
            <h3>Aarav</h3>
            <span>Student, Chandigarh</span>
          </div>

          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"The property options were simple to understand and helped me find a place within my budget."</p>
            <h3>Simran</h3>
            <span>Working Professional, Delhi</span>
          </div>

          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"A simple and useful platform for users looking for accommodation near campus."</p>
            <h3>Rahul</h3>
            <span>Student, Mohali</span>
          </div>

        </div>

      </section>

      {/* ── CONTACT ── */}
      <section className="contact-section" id="contact">

        <div className="contact-content">
          <p className="section-label">CONTACT US</p>
          <h2>Have Questions?</h2>
          <p>Our team is here to help you find your perfect home.</p>

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

      {/* ── FOOTER ── */}
      <footer className="footer">

        <div className="footer-content">

          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z"/>
                  <path d="M9 21V12h6v9"/>
                </svg>
              </span>
              NestWise
            </div>
            <p>A smarter way to rent and buy apartments in India —{' '}
              <span>verified listings, honest pricing.</span>
            </p>
          </div>

          <div className="footer-links">
            <Link to="/results">Browse homes</Link>
            <Link to="/results">For rent</Link>
            <Link to="/results">For sale</Link>
            <Link to="/list-property">List property</Link>
            <a href="#contact">Contact</a>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026 NestWise. All rights reserved.</p>
        </div>

      </footer>

    </div>
  )
}

export default Home