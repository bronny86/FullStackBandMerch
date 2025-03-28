// src/pages/AdminPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavBtnLink } from '../components/Navbar/NavbarElements'; // Import NavBtnLink

const AdminContainer = styled.div`
  padding: 20px;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Ensuring proper spacing between the buttons */
  margin-top: 20px;
`;

const AdminPage = () => {
    return (
        <AdminContainer>
            <h1>Admin Dashboard</h1>
            {/* Buttons styled like Navbar buttons */}
            <ButtonList>
                <NavBtnLink to="/admin/orders">Admin Orders</NavBtnLink>
                <NavBtnLink to="/admin/stock">Admin Stock</NavBtnLink>
                <NavBtnLink to="/admin/clipart">Admin Clipart</NavBtnLink>
            </ButtonList>
        </AdminContainer>
    );
};

export default AdminPage;
