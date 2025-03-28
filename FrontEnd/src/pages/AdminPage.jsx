import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";  // Import styled-components for layout

// Admin page wrapper
const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #f4f4f4;  // Set background color
`;

const AdminHeader = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const AdminLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`;

const AdminLink = styled(Link)`
  font-size: 1.5rem;
  padding: 10px 20px;
  text-decoration: none;
  color: #fff;
  background-color: #256ce1;
  border-radius: 5px;

  &:hover {
    background-color: #fff;
    color: #256ce1;
    border: 1px solid #256ce1;
  }
`;

const AdminPage = () => {
  return (
    <AdminWrapper>
      <AdminHeader>Admin Dashboard</AdminHeader>
      <AdminLinksContainer>
        <AdminLink to="/admin/orders">Admin Orders</AdminLink>
        <AdminLink to="/admin/stock">Admin Stock</AdminLink>
      </AdminLinksContainer>
    </AdminWrapper>
  );
};

export default AdminPage;
