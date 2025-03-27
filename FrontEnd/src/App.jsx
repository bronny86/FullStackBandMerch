import React from "react";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";  // Ensure Navbar is imported correctly
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";    // Note the case sensitivity, should match the file name
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";   // Ensure correct import with proper case
import AdminOrders from "./pages/AdminOrders";

const AppContent = () => {
  return (
    <div id="root">
      <Navbar /> {/* Ensure Navbar is included */}
      <Routes>
        {/* Route definitions */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
