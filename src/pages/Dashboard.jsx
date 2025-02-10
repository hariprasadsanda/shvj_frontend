import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [ownerId, setOwnerId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const navigate = useNavigate();


  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVehicleNumber(""); // Clear input on close
  };

  const handleConfirm = () => {
    if (vehicleNumber.trim() !== "") {
      navigate(`/trip/vehicle/${vehicleNumber}`);
      setShowModal(false);
    } else {
      alert("Please enter a valid vehicle number.");
    }
  };

  // Extract ownerId from token stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setOwnerId(decodedToken.ownerId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch vehicles for logged-in owner
  useEffect(() => {
    if (ownerId) {
      fetch(`https://shvj-backend.onrender.com/vehicle/owner/${ownerId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched vehicles:", data); // Debugging

          if (data && Array.isArray(data.vehicles)) {
            setVehicles(data.vehicles);
          } else {
            console.error("Fetched data is not an array:", data);
            setVehicles([]); // Ensure it's an empty array if data is incorrect
          }
        })
        .catch((err) => console.error("Error fetching vehicles:", err));
    }
  }, [ownerId]);

  // Function to navigate to Add Trip Page with vehicle details
  const handleAddTrip = (vehicleId) => {
    navigate("/addtrip", { state: { vehicleId } });
  };

  const handleDelete = async (vehicleId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }

    try {
      const response = await fetch(`https://shvj-backend.onrender.com/vehicle/delete/${vehicleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete vehicle.");
      }

      alert("Vehicle deleted successfully!");
      setVehicles((prevVehicles) => prevVehicles.filter((v) => v._id !== vehicleId)); // Update state
    } catch (error) {
      alert(error.message);
    }
  };
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("vehicleNumber");
    localStorage.removeItem("ownerId");

    // Redirect to landing page
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Owner Dashboard</h1>

      <div className="dashboard-buttons">
        <Link to="/addvehicle"><button className="primary-btn">Add Vehicle</button></Link>
        <Link to="/owner-financial-summary"><button className="primary-btn">Financial Summary</button></Link>
      </div>

      <h2>My Vehicles</h2>

      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="vehicle-card">
              <p><strong>{vehicle.vehicleNumber}</strong> - {vehicle.vehicleModel} - {vehicle.vehicleCompany}</p>
              
              <div className="vehicle-buttons">
                <button className="add-trip-btn" onClick={() => handleAddTrip(vehicle._id)}>Add Trip</button>
                <button className="all-trips-btn" onClick={handleOpenModal}>Total Trips</button>
                <Link to={`/vehicle-financial-summary/`}><button className="financial-summary-btn">Financial Summary</button></Link>
                <button className="delete-btn" onClick={() => handleDelete(vehicle._id)}>Delete Vehicle</button>
               
                {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Vehicle Number</h3>
            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="input-box"
            />
            <div className="modal-buttons">
              <button onClick={handleConfirm} className="confirm-btn">
                Confirm
              </button>
              <button onClick={handleCloseModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

              </div>
            </div>
          ))}
        </div>
      )}

      <button className="logout-btn" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
