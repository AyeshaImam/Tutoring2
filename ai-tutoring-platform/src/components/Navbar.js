import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; // Import the UserContext
import "./Navbar.css";
import { TbLogout2 } from "react-icons/tb";
const Navbar = () => {
  const { user, isAuthenticated, loading, setIsAuthenticated } =
    useContext(UserContext); // Use context
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Clear user session data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsAuthenticated(false); // Update context state
    navigate("/"); // Redirect to the homepage
  };

  // If still loading, return a loading state or empty (e.g., a spinner)
  if (loading) {
    return null; // You can show a loading spinner here
  }

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/how-it-works">How It Works</Link>
        </li>

        {/* If authenticated, show Profile and Welcome message */}
        {isAuthenticated ? (
          <>
            <li className="welcome-text">
              <Link to="/profile">Welcome, {user?.fullName || "User"}</Link>
            </li>
            {/* Assuming user has fullName */}
            <li onClick={handleLogout} className="logout-button">
              <TbLogout2 color="red" size={20} />
            </li>
          </>
        ) : (
          // If not authenticated, show Login/Register links
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
