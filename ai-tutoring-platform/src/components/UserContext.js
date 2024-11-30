import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [loading, setLoading] = useState(true); // Track loading state

  // On initial load, check if user is authenticated (e.g., from localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // If token exists, try to verify it with the backend or decode the token
      axios
        .get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data); // Assuming response contains user data
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false); // Token verification failed
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the verification process is done
        });
    } else {
      setIsAuthenticated(false); // No token, user is not authenticated
      setLoading(false); // No need to verify further, loading is done
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, loading, setIsAuthenticated, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
