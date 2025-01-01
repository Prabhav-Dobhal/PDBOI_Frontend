import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");

    if (token) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/getuserinfo`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setUserName(response.data.name);
          setBalance(response.data.balance);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error.message);

          if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            sessionStorage.removeItem("jwtToken");
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="dashboard-background">
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="welcome-section">
          <h3>Welcome Back, {userName}!</h3>
          <h3>
            Your Balance is: <span className="balance">₽{balance}</span>
          </h3>
        </div>
        <div className="button-group">
          <button className="btn primary" onClick={() => navigate("/transfer")}>
            Transfer Money
          </button>
          <button
            className="btn secondary"
            onClick={() => navigate("/transactionhistory")}
          >
            Transaction History
          </button>
          <button className="btn danger" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
