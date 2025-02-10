import React from "react";
import "../styles/Features.css";
import logo from "/images/logoA.png"; // Ensure the logo exists in this path

export default function Features() {
  return (
    <div className="features-container">
      {/* Large Logo in the Center */}
      <div className="logo-section">
        <img src={logo} alt="SHVJ Services Logo" className="logo" />
      </div>

      {/* Features List */}
      <div className="features-list">
        <h2>Key Features of SHVJ SERVICES</h2>
        <ul>
          <li>🚛 Vehicle Management - Track and manage all your vehicles efficiently.</li>
          <li>📊 Financial Tracking - Monitor profits, expenses, and generate reports.</li>
          <li>📅 Trip Management - Log trips with start & end dates, earnings, and expenses.</li>
          <li>🔄 Driver Assignment - Assign drivers to vehicles dynamically.</li>
          <li>📍 Loadings & Unloadings - Keep track of cargo weights and locations.</li>
          <li>💰 Profit & Loss Reports - Get a detailed breakdown of your earnings and losses.</li>
          <li>📆 Monthly & Yearly Summaries - Overview of financial performance.</li>
        </ul>
      </div>
    </div>
  );
}
