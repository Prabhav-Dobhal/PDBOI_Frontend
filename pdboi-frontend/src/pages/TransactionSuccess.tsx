import React from "react";
import { useNavigate } from "react-router-dom";

function TransactionSuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Transaction Success</h1>
      <button onClick={() => navigate("/transfer")} className="primary">
        Another Transfer
      </button>
      <button onClick={() => navigate("/dashboard")} className="secondary">
        Dashboard
      </button>
    </div>
  );
}

export default TransactionSuccess;
