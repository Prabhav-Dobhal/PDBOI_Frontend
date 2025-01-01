import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
  const [name, setLegalName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [showUserIdMessage, setShowUserIdMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const nameRegex = /^\S+\s+\S+$/;
    if (!nameRegex.test(name)) {
      alert("Please write your full name (first name and last name)!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/signup`,
        { name, password, email, phoneNumber }
      );

      const newUserId = response.data.userId;
      setUserId(newUserId);
      setShowUserIdMessage(true);
    } catch (err) {
      console.error("Sign Up Failed:", err);
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {!showUserIdMessage ? (
          <>
            <h1 className="signup-heading">Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="signup-input-group">
                <label htmlFor="legalName" className="signup-label">
                  Legal Name
                </label>
                <input
                  type="text"
                  id="legalName"
                  value={name}
                  onChange={(e) => setLegalName(e.target.value)}
                  placeholder="Enter your Legal Name"
                  required
                  className="signup-input"
                />
              </div>

              <div className="signup-input-group">
                <label htmlFor="phoneNumber" className="signup-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your Phone Number"
                  pattern="[0-9]{10}"
                  required
                  className="signup-input"
                />
              </div>

              <div className="signup-input-group">
                <label htmlFor="email" className="signup-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  required
                  className="signup-input"
                />
              </div>

              <div className="signup-input-group">
                <label htmlFor="password" className="signup-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  required
                  className="signup-input"
                />
              </div>

              <div className="signup-input-group">
                <label htmlFor="confirmPassword" className="signup-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your Password"
                  required
                  className="signup-input"
                />
              </div>

              <button type="submit" className="signup-submit-btn">
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <div className="signup-success-message">
            <h2>Your UserID is: {userId}</h2>
            <p>Remember this UserID as it can never be changed!</p>
            <button onClick={redirectToLogin} className="signup-login-btn">
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
