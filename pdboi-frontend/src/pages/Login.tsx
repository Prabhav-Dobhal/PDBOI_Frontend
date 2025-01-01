import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import "../styles/Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle errors
  const [success, setSuccess] = useState(false); // To show success message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`, // Use the URL from .env
        { userId, password }
      );

      // Store the JWT token in sessionStorage
      const token = response.data.token;
      sessionStorage.setItem("jwtToken", token); // For session-based storage

      console.log("Login Successful:", response.data);

      // Redirect to the dashboard after successful login
      navigate("/dashboard"); // This will redirect to the "/dashboard" route

      setSuccess(true);
      setError("");
    } catch (err) {
      console.error("Login Failed:", err);
      setError("Invalid credentials");
      setSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="userId">UserId</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your User Id"
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="primary">
            Login
          </button>
        </form>
        <button
          className="secondary"
          onClick={() => navigate("/signup")}
          style={{ marginTop: "0.5vw" }}
        >
          SignUp
        </button>

        {error && <p className="login-error-message">{error}</p>}
        {success && <p className="login-success-message">Login Successful!</p>}
      </div>
    </div>
  );
}

export default Login;
