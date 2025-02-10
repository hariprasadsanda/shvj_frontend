import React, { useState, useEffect } from "react";
import "../styles/OwnerFinancialSummary.css";

const OwnerFinancialSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFinancialSummary = async () => {
      try {
        const response = await fetch("https://shvj-backend.onrender.com/trip/trips/owner-financial-summary", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token storage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch financial summary");
        }

        const data = await response.json();
        setSummary(data.summary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialSummary();
  }, []);

  return (
    <div className="summary-container">
      <h2>Owner Financial Summary</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {summary && (
        <div className="summary-card">
          <p><strong>Total Trips:</strong> {summary.totalTrips}</p>
          <p><strong>Total Income:</strong> ₹{summary.totalIncome}</p>
          <p style={{color:'red'}}><strong>Total Expenses:</strong> ₹{summary.totalExpenses}</p>
          <p style={{color:'green'}}><strong>Net Profit:</strong> ₹{summary.totalProfit
          }</p>
        </div>
      )}
    </div>
  );
};

export default OwnerFinancialSummary;
