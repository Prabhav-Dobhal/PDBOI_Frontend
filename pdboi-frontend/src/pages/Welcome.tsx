import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css"; // Import the CSS file

function Welcome() {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/login");
  };

  const handleSignUpPage = () => {
    navigate("/signup");
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to PDBOI</h1>
      <div className="button-container">
        <button className="btn login-btn" onClick={handleLoginPage}>
          Login
        </button>
        <button className="btn signup-btn" onClick={handleSignUpPage}>
          SignUp
        </button>
      </div>
    </div>
  );
}

export default Welcome;
