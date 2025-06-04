import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuth } from '../../contexts/AuthContext';
function LoginRegister() {
  const { login } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userName || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userName: userName, password }),
      });
      
      const data = await response.json();
      if (response.ok && data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        if (data.userInfo) {
          login(data.userInfo);
          localStorage.setItem('userId', data.userInfo.userId);
          navigate(`/users`);
        } else {
          console.error('User data missing from response');
          setError('Login successful but user data is missing');
        }
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="register-prompt">
          <p>Don't have an account?</p>
          <button 
            type="button" 
            className="register-button"
            onClick={() => navigate('/register')}
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginRegister;