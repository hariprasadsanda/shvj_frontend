import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "/images/logoA.png"; // Ensure the logo exists in the assets folder

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="navlogo" />
        <h1 style={{marginLeft:'20px' , fontFamily:'"Poppins", sans-serif;'}}> SHVJ SERVICES</h1>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/features">Features</a>
        <a href="/contact">Contact Us</a>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}
