// src/pages/AdminClipart.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';  // Assuming api is set up to communicate with backend
import styled from 'styled-components';

const AdminClipart = () => {
  const [cliparts, setCliparts] = useState([]);
  const [newClipart, setNewClipart] = useState({
    clipartName: '',
    category: '',
    creator: '',
    clipartCost: '',
    colorOptions: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all cliparts from the backend
  const fetchCliparts = async () => {
    try {
      const response = await api.get('/cliparts');
      setCliparts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cliparts.');
    }
  };

  useEffect(() => {
    fetchCliparts();
  }, []);

  // Handle form submission for creating/updating clipart
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editMode) {
        // Update clipart item
        await api.put(`/cliparts/id=${editId}`, newClipart);
      } else {
        // Create new clipart item
        await api.post('/cliparts', newClipart);
      }

      // Refresh cliparts list after adding or updating
      fetchCliparts();

      // Reset the form
      setNewClipart({ clipartName: '', category: '', creator: '', clipartCost: '', colorOptions: '' });
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setError('Failed to submit clipart data.');
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await api.delete(`/cliparts/id=${id}`);
      fetchCliparts(); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete clipart.');
    }
  };

  // Handle edit operation
  const handleEdit = (clipart) => {
    setNewClipart({
      clipartName: clipart.clipartName,
      category: clipart.category,
      creator: clipart.creator,
      clipartCost: clipart.clipartCost,
      colorOptions: clipart.colorOptions,
    });
    setEditMode(true);
    setEditId(clipart._id);
  };

  return (
    <Container>
      <h1>Admin Clipart</h1>

      {error && <Error>{error}</Error>}

      <Form onSubmit={handleSubmit}>
        <h3>{editMode ? 'Update Clipart' : 'Add New Clipart'}</h3>
        <InputWrapper>
          <label>Clipart Name</label>
          <input
            type="text"
            value={newClipart.clipartName}
            onChange={(e) => setNewClipart({ ...newClipart, clipartName: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Category</label>
          <input
            type="text"
            value={newClipart.category}
            onChange={(e) => setNewClipart({ ...newClipart, category: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Creator</label>
          <input
            type="text"
            value={newClipart.creator}
            onChange={(e) => setNewClipart({ ...newClipart, creator: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Cost</label>
          <input
            type="number"
            value={newClipart.clipartCost}
            onChange={(e) => setNewClipart({ ...newClipart, clipartCost: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Color Options</label>
          <input
            type="text"
            value={newClipart.colorOptions}
            onChange={(e) => setNewClipart({ ...newClipart, colorOptions: e.target.value })}
          />
        </InputWrapper>

        <Button type="submit">{editMode ? 'Update Clipart' : 'Add Clipart'}</Button>
      </Form>

      <TableWrapper>
        <h2>Cliparts List</h2>
        <table>
          <thead>
            <tr>
              <th>Clipart Name</th>
              <th>Category</th>
              <th>Creator</th>
              <th>Cost</th>
              <th>Color Options</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cliparts.map((clipart) => (
              <tr key={clipart._id}>
                <td>{clipart.clipartName}</td>
                <td>{clipart.category}</td>
                <td>{clipart.creator}</td>
                <td>${clipart.clipartCost}</td>
                <td>{clipart.colorOptions}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(clipart)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDelete(clipart._id)} delete>
                    Delete
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </Container>
  );
};

export default AdminClipart;

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

