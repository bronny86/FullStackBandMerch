import React from "react";
import { Link } from "react-router-dom";
import { LinkButton } from "../components/Navbar/NavbarElements"; // Correct path to the styled component

const AdminPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. You can manage orders, stock, cliparts, fonts, and designs here:</p>
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
        <LinkButton to="/admin/orders">Admin Orders</LinkButton>
        <LinkButton to="/admin/stock">Admin Stock</LinkButton>
        <LinkButton to="/admin/clipart">Admin Clipart</LinkButton>
        <LinkButton to="/admin/fonts">Admin Fonts</LinkButton>
        <LinkButton to="/admin/designs">Admin Designs</LinkButton>
        <LinkButton to="/admin/payments">Admin Payments</LinkButton>
      </div>
    </div>
  );
};

export default AdminPage;
