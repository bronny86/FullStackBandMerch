import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; // Ensure the correct import path
import Home from "./pages/Home"; // Home page
import GetStarted from "./pages/GetStarted"; // GetStarted page (make sure this file exists)
import AdminPage from "./pages/AdminPage"; // Admin Dashboard page
import AdminOrders from "./pages/AdminOrders"; // Admin Orders page
import AdminStock from "./pages/AdminStock"; // Admin Stock page
import AdminClipart from "./pages/AdminClipart"; // Admin Clipart page
import SignUp from "./pages/SignUp"; // Sign Up page
import LogIn from "./pages/Login"; // LogIn page
import Cart from "./pages/Cart"; // Cart page

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<GetStarted />} /> {/* Ensure this route is added */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/stock" element={<AdminStock />} />
        <Route path="/admin/clipart" element={<AdminClipart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/cart" element={<Cart />} />
        {/* Add more routes as necessary */}
      </Routes>
    </Router>
  );
};

export default App;
