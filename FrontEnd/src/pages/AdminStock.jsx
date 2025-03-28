import React, { useState, useEffect } from 'react';
import api from '../api';  // Assuming api is set up to communicate with backend
import styled from 'styled-components';

const AdminStock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [newStock, setNewStock] = useState({
    color: '',
    size: '',
    material: '',
    price: 0,
    stockQuantity: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch stock items from the backend
  const fetchStockItems = async () => {
    try {
      const response = await api.get('/stocks');
      setStockItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stock items.');
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  // Handle form submission for creating/updating stock items
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editMode) {
        // Update stock item
        await api.put(`/stocks/id=${editId}`, newStock);
      } else {
        // Create new stock item
        await api.post('/stocks', newStock);
      }

      // Refresh stock items list after adding or updating
      fetchStockItems();

      // Reset the form
      setNewStock({ color: '', size: '', material: '', price: 0, stockQuantity: 0 });
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setError('Failed to submit stock data.');
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await api.delete(`/stocks/id=${id}`);
      fetchStockItems(); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete stock item.');
    }
  };

  // Handle edit operation
  const handleEdit = (stock) => {
    setNewStock({
      color: stock.color,
      size: stock.size,
      material: stock.material,
      price: stock.price,
      stockQuantity: stock.stockQuantity,
    });
    setEditMode(true);
    setEditId(stock._id);
  };

  return (
    <Container>
      <h1>Admin Stock</h1>

      {error && <Error>{error}</Error>}

      <Form onSubmit={handleSubmit}>
        <h3>{editMode ? 'Update Stock' : 'Add New Stock'}</h3>
        <InputWrapper>
          <label>Color</label>
          <input
            type="text"
            value={newStock.color}
            onChange={(e) => setNewStock({ ...newStock, color: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Size</label>
          <input
            type="text"
            value={newStock.size}
            onChange={(e) => setNewStock({ ...newStock, size: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Material</label>
          <input
            type="text"
            value={newStock.material}
            onChange={(e) => setNewStock({ ...newStock, material: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Price</label>
          <input
            type="number"
            value={newStock.price}
            onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Stock Quantity</label>
          <input
            type="number"
            value={newStock.stockQuantity}
            onChange={(e) => setNewStock({ ...newStock, stockQuantity: e.target.value })}
          />
        </InputWrapper>
        <Button type="submit">{editMode ? 'Update Stock' : 'Add Stock'}</Button>
      </Form>

      <TableWrapper>
        <h2>Stock List</h2>
        <table>
          <thead>
            <tr>
              <th>Color</th>
              <th>Size</th>
              <th>Material</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.color}</td>
                <td>{stock.size}</td>
                <td>{stock.material}</td>
                <td>${stock.price}</td>
                <td>{stock.stockQuantity}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(stock)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDelete(stock._id)} delete>Delete</ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </Container>
  );
};

export default AdminStock;

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const Error = styled.p`
  color: red;
  font-weight: bold;
`;

const Form = styled.form`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background-color: #256ce1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  &:hover {
    background-color: #1e56a0;
  }
`;

const TableWrapper = styled.div`
  margin-top: 20px;
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
  }
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f8f8f8;
    font-weight: bold;
  }
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.delete ? 'red' : '#256ce1')};
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 0.9rem;
  &:hover {
    background-color: ${(props) => (props.delete ? '#e74c3c' : '#1e56a0')};
  }
`;

