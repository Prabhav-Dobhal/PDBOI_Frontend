import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import ConfirmTransfer from "./pages/ConfirmTransfer.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import FD from "./pages/FD.tsx";
import Homepage from "./pages/Homepage.tsx";
import SignUp from "./pages/SignUp.tsx";
import TransactionFailed from "./pages/TransactionFailed.tsx";
import TransactionSuccess from "./pages/TransactionSuccess.tsx";
import Transfer from "./pages/Transfer.tsx";
import Welcome from "./pages/Welcome.tsx";
import TransactionHistory from "./pages/TransactionHistory.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmtransfer" element={<ConfirmTransfer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fd" element={<FD />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/transactionfailed" element={<TransactionFailed />} />
        <Route path="/transactionsuccess" element={<TransactionSuccess />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/transactionhistory" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
