import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. You can manage orders, stock, clipart, and fonts here:</p>
      <ButtonList>
        <ButtonLink to="/admin/orders">Manage Orders</ButtonLink>
        <ButtonLink to="/admin/stock">Manage Stock</ButtonLink>
        <ButtonLink to="/admin/clipart">Manage Clipart</ButtonLink>
        <ButtonLink to="/admin/fonts">Manage Fonts</ButtonLink> {/* Added the link to Admin Fonts */}
      </ButtonList>
    </div>
  );
};

// Styled Components for buttons
const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const ButtonLink = styled(Link)`
  background-color: #256ce1;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #1e56a0;
  }
`;

export default AdminPage;
