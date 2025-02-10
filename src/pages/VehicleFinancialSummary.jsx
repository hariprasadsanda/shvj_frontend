import React, { useState } from "react";
import "../styles/VehicleFinancialSummary.css";

const VehicleFinancialSummary = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFinancialSummary = async () => {
    if (!vehicleNumber.trim()) {
      setError("Please enter a valid vehicle number");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://shvj-backend.onrender.com/trip/trips/vehicle-financial-summary?vehicleNumber=${vehicleNumber.toUpperCase()}`, // Convert to uppercase
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token storage
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch vehicle financial summary");
      }

      const result = await response.json();
      console.log("Fetched Data:", result); // Debugging log
      setSummary(result.summary); // Extract summary from response
    } catch (err) {
      setError(err.message);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vehicle-summary-container">
      <h2>Vehicle Financial Summary</h2>
      <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
        className="vehicle-input"
      />
      <button onClick={fetchFinancialSummary} className="fetch-button">
        Get Summary
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {summary && (
        <div className="summary-card">
          <p><strong>Total Trips:</strong> {summary.totalTrips}</p>
          <p><strong>Total Income:</strong> ₹{summary.totalIncome}</p>
          <p style={{color:'red'}}><strong>Total Expenses:</strong> ₹{summary.totalExpenses}</p>
          <p style={{color:'green'}}><strong>Net Profit:</strong> ₹{summary.totalProfit}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleFinancialSummary;
