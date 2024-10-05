import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  let csrfToken = null;
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name === "csrftoken") {
      csrfToken = value;
    }
  });
  return csrfToken;
};

// Create an axios instance with default configs
const instance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // Ensure cookies are included
});


function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  const [errorMessage, setErrorMessage] = useState("");  // To handle the error message
  const navigate = useNavigate(); // To handle redirection
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = getCSRFToken(); // Retrieve the CSRF token from cookies
      
      const response = await instance.post("/accounts/signup/", formData, {
        headers: {
          "X-CSRFToken": csrfToken, // Include CSRF token in the headers
          "Content-Type": "application/json"  // Ensure content type is set correctly
        }
      });
      
      // Redirect to login page upon successful signup
      navigate("/login");
    } catch (err) {
      // Handle error and display message to user
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.error);  // Show the error message returned from the server
      } else if (err.response && err.response.status === 403) {
        setErrorMessage("CSRF token missing or incorrect.");
      } else {
        console.error(err);
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {/* Already registered? Show login link */}
      <p>
        Already registered? <a href="/login">Please login</a>.
      </p>
    </div>
  );
}

export default Signup;
