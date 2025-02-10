import { Link } from "react-router-dom";
import "../styles/Landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>SHVJ SERVICES</h1>
        <p>Efficiently manage your vehicles, trips, and finances all in one place.</p>
        <div className="buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn btn-alt">Register</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose SHVJ SERVICES?</h2>
        <div className="feature-list">
          <div className="feature">
            <img src="/images/vehicle-management.png" alt="Vehicle Management" />
            <h3>Vehicle Management</h3>
            <p>Track vehicle details, drivers, and maintenance records.</p>
          </div>
          <div className="feature">
            <img src="/images/trip-tracking.png" alt="Trip Tracking" />
            <h3>Trip Tracking</h3>
            <p>Monitor trips, expenses, and profits in real-time.</p>
          </div>
          <div className="feature">
            <img src="/images/finance.png" alt="Finance Management" />
            <h3>Financial Insights</h3>
            <p>Generate financial reports and track your business growth.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works?</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Create an account and add your vehicles.</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Track trips, expenses, and assign drivers.</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>Monitor profits and generate financial reports.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
