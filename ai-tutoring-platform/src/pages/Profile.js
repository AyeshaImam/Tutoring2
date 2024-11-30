// src/pages/Profile.js
import React, { useState, useContext } from "react";
import "./Profile.css";
import { UserContext } from "../components/UserContext";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const { user: userData } = useContext(UserContext); // Use context
  const user = {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    joinDate: "January 2024",
    enrolledCourses: [
      {
        id: 1,
        name: "Computer Science",
        progress: 75,
        lastAccessed: "2024-02-15",
      },
      { id: 2, name: "Mathematics", progress: 45, lastAccessed: "2024-02-14" },
      { id: 3, name: "Physics", progress: 30, lastAccessed: "2024-02-13" },
    ],
    achievements: [
      {
        id: 1,
        title: "Fast Learner",
        icon: "🚀",
        description: "Completed 5 courses in one month",
      },
      {
        id: 2,
        title: "Perfect Score",
        icon: "🎯",
        description: "Achieved 100% in Python basics",
      },
      {
        id: 3,
        title: "Consistent",
        icon: "⭐",
        description: "30-day learning streak",
      },
    ],
    stats: {
      coursesCompleted: 5,
      totalHours: 120,
      averageScore: 92,
      learningStreak: 15,
    },
  };
  console.log(userData);
  const [userForm, setUserForm] = useState({
    name: userData?.fullName,
    email: userData?.email,
    bio: "Passionate learner exploring the world of technology and science.",
    preferences: {
      emailNotifications: true,
      darkMode: false,
      language: "English",
    },
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const renderProgressBar = (progress) => (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}>
        <span className="progress-text">{progress}%</span>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-header-content">
          <div className="profile-avatar">
            <img src={user.avatar} alt="Profile" />
            {!isEditing && (
              <button className="edit-avatar-btn">
                <span>📸</span>
              </button>
            )}
          </div>
          <div className="profile-info">
            {isEditing ? (
              <input
                type="text"
                value={userForm.name}
                onChange={(e) =>
                  setUserForm({ ...userForm, name: e.target.value })
                }
                className="edit-input"
              />
            ) : (
              <h1>{userData.fullName}</h1>
            )}
            <p className="join-date">Member since {user.joinDate}</p>
          </div>
          <button
            className={`edit-profile-btn ${isEditing ? "save" : ""}`}
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="profile-nav">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "courses" ? "active" : ""}
          onClick={() => setActiveTab("courses")}
        >
          My Courses
        </button>
        <button
          className={activeTab === "achievements" ? "active" : ""}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </button>
        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "overview" && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">📚</span>
                <h3>{user.stats.coursesCompleted}</h3>
                <p>Courses Completed</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⏱️</span>
                <h3>{user.stats.totalHours}h</h3>
                <p>Learning Hours</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">📊</span>
                <h3>{user.stats.averageScore}%</h3>
                <p>Average Score</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🔥</span>
                <h3>{user.stats.learningStreak}</h3>
                <p>Day Streak</p>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-timeline">
                {user.enrolledCourses.map((course) => (
                  <div key={course.id} className="activity-item">
                    <div className="activity-icon">📖</div>
                    <div className="activity-content">
                      <h3>{course.name}</h3>
                      <p>
                        Last accessed on{" "}
                        {new Date(course.lastAccessed).toLocaleDateString()}
                      </p>
                      {renderProgressBar(course.progress)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="achievements-section">
            <div className="achievements-grid">
              {user.achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <div className="settings-group">
              <h2>Profile Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={userForm.bio}
                    onChange={(e) =>
                      setUserForm({ ...userForm, bio: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h2>Preferences</h2>
              <div className="preferences-list">
                <label className="preference-item">
                  <span>Email Notifications</span>
                  <input
                    type="checkbox"
                    checked={userForm.preferences.emailNotifications}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        preferences: {
                          ...userForm.preferences,
                          emailNotifications: e.target.checked,
                        },
                      })
                    }
                    disabled={!isEditing}
                  />
                </label>
                <label className="preference-item">
                  <span>Dark Mode</span>
                  <input
                    type="checkbox"
                    checked={userForm.preferences.darkMode}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        preferences: {
                          ...userForm.preferences,
                          darkMode: e.target.checked,
                        },
                      })
                    }
                    disabled={!isEditing}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
