import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AllTrips.css"; // Import the responsive CSS

const AllTrips = () => {
  const { vehicleNumber } = useParams();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized! Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://shvj-backend.onrender.com/trip/vehicle/${vehicleNumber}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trips.");
        }

        const data = await response.json();
        setTrips(data.trips); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [vehicleNumber]);

   // Function to trigger print
   const handlePrint = () => {
    window.print();
  };

  return (
    <div className="trips-container">
      <h2>All Trips for Vehicle: {vehicleNumber}</h2>

      {loading && <p className="loading">Loading trips...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && trips.length === 0 && <p>No trips found.</p>}

      {!loading && !error && trips.length > 0 && (
        <>
          {/* Table for Desktop View */}
          <div className="table-wrapper desktop-view">
            <table className="trips-table">
              <thead>
                <tr>
                  <th>Start Location</th>
                  <th>Destination</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Load (Tons)</th>
                  <th>Cost per Ton</th>
                  <th>Total Income</th>
                  <th>Expenses</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip._id}>
                    <td>{trip.startLocation}</td>
                    <td>{trip.destination}</td>
                    <td>{new Date(trip.startDate).toLocaleDateString()}</td>
                    <td>
                      {trip.endDate
                        ? new Date(trip.endDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{trip.loadInTons}</td>
                    <td>₹{trip.costPerTon.toLocaleString()}</td>
                    <td>₹{(trip.loadInTons * trip.costPerTon).toLocaleString()}</td>
                    <td>
                      ₹
                      {Object.values(trip.expenses)
                        .reduce((a, b) => a + Number(b), 0)
                        .toLocaleString()}
                    </td>
                    <td>
                      ₹
                      {(
                        trip.loadInTons * trip.costPerTon -
                        Object.values(trip.expenses).reduce((a, b) => a + Number(b), 0)
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handlePrint} className="print-btn">Print Records</button>
          </div>

          {/* Mobile View with "View Details" */}
          <div className="mobile-view">
            {trips.map((trip) => (
              <div key={trip._id} className="trip-card">
                <p><strong>Start Location:</strong> {trip.startLocation}</p>
                <p><strong>Destination:</strong> {trip.destination}</p>
                <p><strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : "N/A"}</p>
                <button className="details-btn" onClick={() => setSelectedTrip(trip)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <button onClick={() => navigate("/dashboard")} className="back-btn">
        Back to Dashboard
      </button>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <div className="modal-overlay" onClick={() => setSelectedTrip(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Trip Details</h3>
            <p><strong>Start Location:</strong> {selectedTrip.startLocation}</p>
            <p><strong>Destination:</strong> {selectedTrip.destination}</p>
            <p><strong>Start Date:</strong> {new Date(selectedTrip.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {selectedTrip.endDate ? new Date(selectedTrip.endDate).toLocaleDateString() : "N/A"}</p>
            <p><strong>Load (Tons):</strong> {selectedTrip.loadInTons}</p>
            <p><strong>Cost per Ton:</strong> ₹{selectedTrip.costPerTon.toLocaleString()}</p>
            <p><strong>Total Income:</strong> ₹{(selectedTrip.loadInTons * selectedTrip.costPerTon).toLocaleString()}</p>
            <p><strong>Expenses:</strong> ₹{Object.values(selectedTrip.expenses).reduce((a, b) => a + Number(b), 0).toLocaleString()}</p>
            <p><strong>Profit:</strong> ₹{(selectedTrip.loadInTons * selectedTrip.costPerTon - Object.values(selectedTrip.expenses).reduce((a, b) => a + Number(b), 0)).toLocaleString()}</p>
            <button onClick={handlePrint} className="print-btn">Print Records</button>
            <button className="close-btn" onClick={() => setSelectedTrip(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrips;
