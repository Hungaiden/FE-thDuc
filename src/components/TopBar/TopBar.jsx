import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./styles.css";

function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="top-bar">
      <nav className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-link logo">
            Photo Sharing App
          </Link>
          {user && (
            <>
              <Link to="/users" className="nav-link">
                | Users
              </Link>
            </>
          )}
        </div>
        <div className="nav-right">
          {user ? (
            <>
              <button onClick={() => navigate('/upload')} className="upload-button">
                Add Photo
              </button>
              <span className="welcome-text">Hi, {user.login_name}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-link">
              Please Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default TopBar;
