import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <span className="logo-icon">✳</span>
        <span>NestWise</span>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/">Browse</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>

      <div className="nav-buttons">
        <Link to="/login" className="login-btn">
          Login
        </Link>
        <button className="signup-btn">Sign Up</button>
      </div>

    </nav>
  )
}

export default Navbar