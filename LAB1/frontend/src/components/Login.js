import React, { useState } from "react";
import axios from "axios";
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

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // Create a navigate function for redirection
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = getCSRFToken(); // Get CSRF token
      await axios.post("http://localhost:8000/accounts/login/", formData, {
        headers: {
          "X-CSRFToken": csrfToken, // Include CSRF token in the headers
          "Content-Type": "application/json" // Ensure the content type is JSON
        },
        withCredentials: true, // Include credentials with the request
      });

      // alert("Login successful! Redirecting to dashboard.");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      console.error(err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;