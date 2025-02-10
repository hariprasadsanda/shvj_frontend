import React, { useState } from "react";
import "../styles/AddVehicleForm.css";
import { useNavigate } from "react-router-dom";
const AddVehicleForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    vehicleCompany: "",
    noOfWheels: "",
    owner: "", // You may auto-fill this from user context
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://shvj-backend.onrender.com/vehicle/Add-vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token storage
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Vehicle added successfully!");
        navigate("/dashboard"); // Redirect to Dashboard after successful response
        setFormData({
          vehicleNumber: "",
          vehicleModel: "",
          vehicleCompany: "",
          noOfWheels: "",
          owner: "", // You may auto-fill this from user context
        });
      } else {
        alert(result.message || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <label>Vehicle Number:</label>
        <input
          type="text"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
        />

        <label>Vehicle Model:</label>
        <input
          type="text"
          name="vehicleModel"
          value={formData.vehicleModel}
          onChange={handleChange}
          required
        />

        <label>Vehicle Company:</label>
        <input
          type="text"
          name="vehicleCompany"
          value={formData.vehicleCompany}
          onChange={handleChange}
          required
        />

        <label>No. of Wheels:</label>
        <input
          type="number"
          name="noOfWheels"
          value={formData.noOfWheels}
          onChange={handleChange}
        />

        <label>Owner ID:</label>
        <input
          type="text"
          name="owner"
          value={localStorage.getItem("ownerId")}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicleForm;
