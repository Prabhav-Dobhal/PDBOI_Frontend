import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const token = sessionStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const fetchTransactions = async (page) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/gettransactionhistory`,
        {
          headers: {
            Authorization: `${token}`,
          },
          page,
          limit: 15,
        }
      );

      if (response.data.transactions.length < 15) {
        setHasMore(false);
      }

      setTransactions((prev) => [...prev, ...response.data.transactions]);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      alert(
        error.response?.data?.message ||
          "An unexpected error occurred. Try again."
      );
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#333" }}>
        Transaction History
      </h1>

      {transactions.length > 0 ? (
        <div
          style={{
            overflowX: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#2980b9", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Description
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                const transactionDate = new Date(transaction.date);
                const date = transactionDate.toLocaleDateString();
                const time = transactionDate.toLocaleTimeString();

                return (
                  <tr key={index}>
                    <td style={{ padding: "12px" }}>
                      {transaction.amount < 0
                        ? `Sent to ${transaction.recipient}`
                        : `Received from ${transaction.recipient}`}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: transaction.amount < 0 ? "red" : "green",
                      }}
                    >
                      ₽{Math.abs(transaction.amount)}
                    </td>
                    <td style={{ padding: "12px" }}>{date}</td>
                    <td style={{ padding: "12px" }}>{time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions to display.</p>
      )}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {hasMore && (
          <button
            onClick={handleNextPage}
            disabled={!hasMore}
            className="primary"
          >
            Load More
          </button>
        )}
        <button onClick={() => navigate("/dashboard")} className="secondary">
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default TransactionHistory;
