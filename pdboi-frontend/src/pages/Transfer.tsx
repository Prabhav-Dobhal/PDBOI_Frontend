import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Transfer.css"; // Import the CSS file for styling

function Transfer() {
  const [userID, setUserID] = useState(""); // State for user ID
  const [amount, setAmount] = useState(0); // State for transfer amount
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");

  const handleNavigateToConfirm = async () => {
    if (amount <= 0) {
      alert("Enter amount greater than 0");
      return;
    }

    try {
      // Verify if user exists and account has enough money
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/verifytransaction`,
        {
          userID,
          amount,
          headers: {
            Authorization: `${token}`, // Pass token in Authorization header
          },
        }
      );

      if (response.status === 200) {
        // If the response is successful, navigate to the confirm transfer page
        navigate("/confirmtransfer", {
          state: {
            recipientID: userID,
            amount,
            recipientName: response.data.Recipient,
          },
        });
      }
    } catch (error) {
      // Handle different error cases
      console.error("Error during verification:", error.message);
      if (error.response) {
        alert(error.response.data.message); // Show error message from API
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="transfer-container">
      <h1>Transfer Money</h1>
      <form
        className="transfer-form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleNavigateToConfirm();
        }}
      >
        <div className="form-group">
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="Enter recipient's User ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to transfer"
            required
          />
        </div>
        <button className="btn primary" type="submit">
          Proceed to Confirm Transfer
        </button>
      </form>
    </div>
  );
}

export default Transfer;
