import React from "react";
import "../styles/Footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* <img src="/images/logoA.png" alt="SHVJ Services Logo" className="footer-logo" /> */}
        <p>© {new Date().getFullYear()} SHVJ SERVICES. All rights reserved.</p>
        <p>Contact: support@shvjservices.com</p>
      </div>
    </footer>
  );
};

export default Footer;
