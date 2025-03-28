import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminOrders from "./pages/AdminOrders";
import AdminStock from "./pages/AdminStock";
import AdminClipart from "./pages/AdminClipart";
import AdminFonts from "./pages/AdminFonts";
import LogInPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import AdminPage from "./pages/AdminPage"; // Import AdminPage here
import GetStarted from "./pages/GetStarted";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/stock" element={<AdminStock />} />
        <Route path="/admin/clipart" element={<AdminClipart />} />
        <Route path="/admin/fonts" element={<AdminFonts />} />
        <Route path="/GetStarted" element={<GetStarted />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
