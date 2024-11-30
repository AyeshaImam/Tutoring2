import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider, UserContext } from "./components/UserContext"; // Import the context
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import HowItWorksPage from "./pages/HowItWorksPage";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AvailableCourses from "./pages/AvailableCourses";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      {" "}
      {/* Wrap the entire app inside UserProvider */}
      <Router>
        <div className="App">
          <Navbar />
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />

              {/* Conditional Redirect for Login and Register */}
              <Route path="/login" element={<LoginRedirect />} />
              <Route path="/register" element={<RegisterRedirect />} />

              {/* Shared Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses"
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses/:courseName"
                element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                }
              />

              {/* Student-Specific Routes */}
              <Route
                path="/courses/register"
                element={
                  <ProtectedRoute role="student">
                    <AvailableCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/student"
                element={
                  <ProtectedRoute role="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Teacher-Specific Routes */}
              <Route
                path="/dashboard/teacher"
                element={
                  <ProtectedRoute role="teacher">
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin-Specific Routes */}
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Dynamic Dashboard Route */}
              <Route path="/dashboard" element={<DashboardRedirect />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

// Custom LoginRedirect component to handle the login redirect logic based on user auth state
function LoginRedirect() {
  const { isAuthenticated, loading } = useContext(UserContext); // Get the auth state from context

  if (loading) {
    return <div>Loading...</div>; // Show loading state if still fetching auth status
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Login />;
}

// Custom RegisterRedirect component to handle the register redirect logic
function RegisterRedirect() {
  const { isAuthenticated, loading } = useContext(UserContext); // Get the auth state from context

  if (loading) {
    return <div>Loading...</div>; // Show loading state if still fetching auth status
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Register />;
}
const DashboardRedirect = () => {
  const role = localStorage.getItem("role");

  switch (role) {
    case "student":
      return <Navigate to="/dashboard/student" />;
    case "teacher":
      return <Navigate to="/dashboard/teacher" />;
    case "admin":
      return <Navigate to="/dashboard/admin" />;
    default:
      return <Navigate to="/login" />;
  }
};

export default App;
