import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import UserDetail from "./components/UserDetail/UserDetail";
import UserList from "./components/UserList/UserList";
import UserPhotos from "./components/UserPhotos/UserPhotos";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UploadPhoto from './components/UploadPhoto/UploadPhoto';
function Home() {
  return (
    <div className="home-container">
      <h1>Home Page</h1>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <TopBar />
          <div className="main-layout">
            <UserList />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/users/:userId"
                  element={
                    <ProtectedRoute>
                      <UserDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <ProtectedRoute>
                      <UserPhotos />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadPhoto />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
