import React from "react";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        NestWise
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>

    </nav>
  );
}

export default Navbar;