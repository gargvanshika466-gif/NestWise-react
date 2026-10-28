import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './home.css'

const PROPERTIES = [
  {
    id: 1,
    badge: 'FOR RENT',
    featured: true,
    price: '₹32,000/mo',
    title: 'Modern 2BHK near Hitech City',
    location: 'Gachibowli, Hyderabad',
    beds: 2, baths: 2, sqft: '1,080',
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    badge: 'FOR RENT',
    featured: true,
    price: '₹28,000/mo',
    title: 'Quiet 2BHK in Koregaon Park',
    location: 'Koregaon Park, Pune',
    beds: 2, baths: 2, sqft: '980',
    img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    badge: 'FOR SALE',
    featured: true,
    price: '₹2.65 Cr',
    title: 'Sea-facing 3BHK in Bandra West',
    location: 'Bandra West, Mumbai',
    beds: 3, baths: 3, sqft: '1,650',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    badge: 'FOR SALE',
    featured: true,
    price: '₹1.85 Cr',
    title: 'Garden villa with private lawn',
    location: 'Whitefield, Bangalore',
    beds: 4, baths: 4, sqft: '2,850',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    badge: 'FOR RENT',
    featured: true,
    price: '₹19,500/mo',
    title: 'Studio loft in Anna Nagar',
    location: 'Anna Nagar, Chennai',
    beds: 1, baths: 1, sqft: '620',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    badge: 'FOR RENT',
    featured: true,
    price: '₹55,000/mo',
    title: 'Sunlit 3BHK in Indiranagar',
    location: 'Indiranagar, Bangalore',
    beds: 3, baths: 2, sqft: '1,450',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  },
]

const TOP_CITIES = ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Chennai', 'Delhi NCR']

function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate('/results')
  }

  return (
    <div className="home-page">

      {/* ── NAVBAR (Matches Reference Screenshot 1) ── */}
      <nav className="navbar" id="home">

        <Link to="/" className="logo">
          <span className="logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z"/>
              <path d="M9 21V12h6v9"/>
            </svg>
          </span>
          NestWise
        </Link>

        <div className="nav-links">
          <Link to="/results">Browse homes</Link>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">Log in</Link>
          <Link to="/signup" className="signup-btn">Register</Link>
          <Link to="/list-property" className="list-nav-btn">List Property</Link>
          <button type="button" className="download-btn" onClick={() => alert('NestWise mobile app coming soon!')}>
            Download App
          </button>
        </div>

      </nav>

      {/* ── HERO (Matches Reference Screenshot 1) ── */}
      <section className="hero">
        <div className="hero-inner">

          <div className="hero-badge">
            <span className="badge-sparkle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
              </svg>
            </span>
            Trusted &amp; loved by home seekers across India
          </div>

          <h1 className="hero-title">
            Find a home that<br />
            <span className="hero-highlight">feels like yours</span>
          </h1>

          <p className="hero-subtitle">
            Verified apartments to rent and buy across India's best cities — honest prices, real photos, and zero brokerage games.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <span className="search-pin">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
            {TOP_CITIES.map(city => (
              <Link key={city} to="/results" className="top-city-link">{city}</Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── FEATURED HOMES (Matches Reference Screenshots 2 & 3) ── */}
      <section className="featured-section" id="properties">

        <div className="featured-header">
          <div>
            <p className="section-label">HANDPICKED</p>
            <h2>Featured homes</h2>
            <p className="section-text">
              Verified apartments with real photography and clear pricing — ready to move into.
            </p>
          </div>
          <Link to="/results" className="view-all-btn">View all homes →</Link>
        </div>

        <div className="property-cards">
          {PROPERTIES.map(p => (
            <div key={p.id} className="property-card">
              <div className="card-image-wrap">
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className={`badge-type ${p.badge === 'FOR SALE' ? 'sale' : ''}`}>{p.badge}</span>
                <span className="badge-featured">Featured</span>
              </div>
              <div className="card-body">
                <div className="card-price">{p.price}</div>
                <div className="card-title">{p.title}</div>
                <div className="card-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {p.location}
                </div>
                <div className="card-specs">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4v16"/><path d="M22 4v16"/><path d="M2 12h20"/><path d="M2 8h5a2 2 0 0 1 2 2v2H2"/><path d="M22 8h-5a2 2 0 0 0-2 2v2h7"/>
                    </svg>
                    {p.beds} Beds
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/>
                    </svg>
                    {p.baths} Baths
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                    </svg>
                    {p.sqft} sq.ft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── HOW IT WORKS (Matches Reference Screenshot 4) ── */}
      <section className="how-section" id="how-it-works">

        <p className="section-label">HOW IT WORKS</p>
        <h2>Three steps to your next address</h2>
        <p className="section-text">
          NestWise keeps the whole journey simple, transparent and free of clutter.
        </p>

        <div className="how-cards">

          <div className="how-card">
            <div className="how-icon" style={{ background: '#FCE7F3' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <h3>Search</h3>
            <p>Tell us the city or locality you have in mind and see verified homes with real photos.</p>
          </div>

          <div className="how-card">
            <div className="how-icon" style={{ background: '#D8F956' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3>Shortlist</h3>
            <p>Compare rent, size and amenities side by side, then keep the handful you actually love.</p>
          </div>

          <div className="how-card">
            <div className="how-icon" style={{ background: '#DCFCE7' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3>Contact</h3>
            <p>Reach the owner or our city partner directly — no middlemen, no brokerage surprises.</p>
          </div>

        </div>

      </section>

      {/* ── FOR OWNERS CTA BANNER (Matches Reference Screenshot 5) ── */}
      <section className="owner-cta-section">
        <div className="owner-cta-card">
          <div className="owner-cta-content">
            <div className="owner-cta-badge">
              <span className="owner-cta-sparkle">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
                </svg>
              </span>
              <span>For owners</span>
            </div>
            <h2 className="owner-cta-title">Have a home to rent or sell?</h2>
            <p className="owner-cta-desc">
              List it on NestWise in three short steps. Add photos, set your price, and it goes live instantly — no brokerage and no waiting for approval.
            </p>
          </div>
          <Link to="/list-property" className="owner-cta-btn">
            List your property →
          </Link>
        </div>
      </section>

      {/* ── FOOTER (Matches Reference Screenshot 5) ── */}
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
            <p className="footer-desc">
              A smarter way to rent and buy apartments in India — verified listings, honest pricing.
            </p>
            <p className="footer-copy">© 2026 NestWise</p>
          </div>

          <div className="footer-links">
            <Link to="/results">Browse homes</Link>
            <Link to="/results">For rent</Link>
            <Link to="/results">For sale</Link>
            <Link to="/list-property">List your property</Link>
          </div>

        </div>
      </footer>

    </div>
  )
}

export default Home