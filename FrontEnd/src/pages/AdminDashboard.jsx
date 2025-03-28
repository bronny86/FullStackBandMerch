import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. You can manage orders and stock here:</p>
      <ul>
        <li>
          <Link to="/admin/orders">Manage Orders</Link>
        </li>
        <li>
          <Link to="/admin/stock">Manage Stock</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
