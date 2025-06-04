import React, { useState } from 'react';
import './styles.css'; // Assuming you have a styles.css file for styling
function Register() {
  const [formData, setFormData] = useState({
    login_name: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    location: '',
    description: '',
    occupation: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validation password confirm
    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    // Optional: You can add more validation here

    // Prepare data to send (exclude confirmPassword)
    const payload = {
      login_name: formData.login_name,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      location: formData.location,
      description: formData.description,
      occupation: formData.occupation,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // If server returns error message, show it
        setError(data.message || 'Registration failed');
      } else {
        setSuccessMessage('Registration successful!');
        // Clear form
        setFormData({
          login_name: '',
          password: '',
          confirmPassword: '',
          first_name: '',
          last_name: '',
          location: '',
          description: '',
          occupation: '',
        });
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: 10 }}>{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Login Name:</label><br />
          <input
            type="text"
            name="login_name"
            value={formData.login_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>First Name:</label><br />
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label><br />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location:</label><br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description:</label><br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Occupation:</label><br />
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Register Me</button>
      </form>
    </div>
  );
}

export default Register;
