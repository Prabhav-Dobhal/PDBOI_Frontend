import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/login");
  };

  const handleSignUpPage = () => {
    navigate("/signup");
  };
  return (
    <div>
      <h1>Welcome to PDBOI </h1>
      <button onClick={handleLoginPage}>Login</button>
      <button onClick={handleSignUpPage}>SignUp</button>
    </div>
  );
}

export default Welcome;
