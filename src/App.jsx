import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTrip from "./pages/Addtrip";
import Alltrips from "./pages/AllTrips";
import AddVehicleForm from "./pages/AddVehicleForm";
import OwnerFinancialSummary from "./pages/OwnerFinancialSummary";
import ProtectedRoute from "./pages/ProtectedRoute"; // Import ProtectedRoute
import VehicleFinancialSummary from "./pages/VehicleFinancialSummary";
import Features from "./pages/Features";
import Navbar from "./pages/Navbar";
import ContactUs from "./pages/ContactUs";
import Footer from "./pages/Footer";

function App() {
  return (
  
    <Router>
      <Navbar/>
      <Routes>
        {/* Public Routes - Accessible by everyone */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<ContactUs/>} />
        

        {/* Protected Routes - Only accessible when logged in */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtrip"
          element={
            <ProtectedRoute>
              <AddTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip/vehicle/:vehicleNumber"
          element={
            <ProtectedRoute>
              <Alltrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addvehicle"
          element={
            <ProtectedRoute>
              <AddVehicleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner-financial-summary"
          element={
            <ProtectedRoute>
              <OwnerFinancialSummary />
            </ProtectedRoute>
          }
        />
        <Route path="/vehicle-financial-summary" element={<ProtectedRoute> <VehicleFinancialSummary/> </ProtectedRoute>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
