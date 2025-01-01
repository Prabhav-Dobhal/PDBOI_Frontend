import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ConfirmTransfer.css"; // Import the CSS file

function ConfirmTransaction() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipientID, amount, recipientName } = location.state || {};

  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState("");

  const handleTransfer = async () => {
    if (!recipientID || !amount || !recipientName) {
      setError("Missing required information.");
      return;
    }

    setIsTransferring(true);

    try {
      const token = sessionStorage.getItem("jwtToken");

      // Make the API call to confirm the transfer
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transfer`,
        {
          amount,
          recipientID: recipientID,
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/transactionsuccess"); // Navigate to success page on successful transfer
      }
    } catch (error) {
      console.error("Error during transfer:", error.message);
      setError(
        error.response
          ? error.response.data.message
          : "An unexpected error occurred."
      );
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="confirm-transaction-container">
      <h1>Confirm Transfer</h1>

      {error && <p className="error-message">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Recipient Name</th>
            <th>Transfer Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{recipientName ? recipientName : "Loading..."}</td>
            <td>₽ {Number(amount)}</td>
            <td>
              <button
                className="primary"
                onClick={handleTransfer}
                disabled={isTransferring}
              >
                {isTransferring ? "Processing..." : "Transfer"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="action-buttons">
        <button className="tertiary" onClick={() => navigate("/transfer")}>
          Update Information
        </button>
        <button className="secondary" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmTransaction;
