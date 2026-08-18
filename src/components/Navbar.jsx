function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        ✳ <span>NestWise</span>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/">Browse</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  )
}

export default Navbar