import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddTrip.css"; // Import CSS

const AddTrip = () => {
  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    vehicleNumber: "",
    startLocation: "",
    destination: "",
    startDate: "",
    endDate: "",
    loadInTons: "",
    costPerTon: "",
    expenses: {
      fuel: "",
      tolls: "",
      maintenance: "",
      driverPayment: "",
      loadingExpenses: "",
      unloadingExpenses: "",
      other: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in tripData.expenses) {
      setTripData((prev) => ({
        ...prev,
        expenses: { ...prev.expenses, [name]: value },
      }));
    } else {
      setTripData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const response = await fetch("https://shvj-backend.onrender.com/trip/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tripData),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert("✅ Trip added successfully!");
        navigate(`/trip/vehicle/${tripData.vehicleNumber}`);
      } else {
        alert(`❌ Failed to add trip: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding trip:", error);
      alert("❌ An error occurred while adding the trip.");
    }
  };

  return (
    <div className="add-trip-container">
      <h2>Add Trip</h2>
      <form onSubmit={handleSubmit} className="trip-form">
        <label>Vehicle Number:</label>
        <input type="text" name="vehicleNumber" value={tripData.vehicleNumber} onChange={handleChange} required />

        <label>Start Location:</label>
        <input type="text" name="startLocation" value={tripData.startLocation} onChange={handleChange} required />

        <label>Destination:</label>
        <input type="text" name="destination" value={tripData.destination} onChange={handleChange} required />

        <label>Start Date:</label>
        <input type="date" name="startDate" value={tripData.startDate} onChange={handleChange} required />

        <label>End Date:</label>
        <input type="date" name="endDate" value={tripData.endDate} onChange={handleChange} />

        <label>Load in Tons:</label>
        <input type="number" name="loadInTons" value={tripData.loadInTons} onChange={handleChange} required />

        <label>Cost Per Ton:</label>
        <input type="number" name="costPerTon" value={tripData.costPerTon} onChange={handleChange} required />

        <h3>Expenses:</h3>
        {Object.keys(tripData.expenses).map((key) => (
          <div key={key} className="expense-field">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input type="number" name={key} value={tripData.expenses[key]} onChange={handleChange} />
          </div>
        ))}

        <button type="submit" className="submit-btn">Add Trip</button>
      </form>
    </div>
  );
};

export default AddTrip;
