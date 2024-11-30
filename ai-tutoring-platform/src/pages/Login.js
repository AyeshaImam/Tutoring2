import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext"; // Import UserContext
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(UserContext); // Use context to update user and auth state
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role, _id, fullName } = data; // Ensure backend sends `fullName` in the response

        // Store token, role, and _id in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("_id", _id);
        if (fullName) {
          localStorage.setItem("fullName", fullName); // Store fullName for personalization
        }

        // Update context with user data
        setUser({ fullName, email: formData.email, role, _id });
        setIsAuthenticated(true);

        // Redirect based on role
        if (role === "student") {
          navigate("/dashboard/student");
        } else if (role === "teacher") {
          navigate("/dashboard/teacher");
        } else if (role === "admin") {
          navigate("/dashboard/admin");
        } else {
          throw new Error("Unknown role"); // Handle unexpected roles
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password"); // Use backend error message if available
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Please enter your credentials to continue</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-with-icon"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-with-icon"
          />

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
