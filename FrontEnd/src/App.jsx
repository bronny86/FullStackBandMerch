// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import for v6
import Navbar from './components/Navbar/Navbar'; // Ensure the correct path
import AdminPage from './pages/AdminPage'; 
import AdminOrders from './pages/AdminOrders';
import AdminStock from './pages/AdminStock';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar should be rendered globally */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/stock" element={<AdminStock />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
