import React, { useState, useEffect } from 'react';
import api from '../api';  // Assuming api is set up to communicate with the backend
import styled from 'styled-components';

const AdminDesigns = () => {
  const [designs, setDesigns] = useState([]);
  const [newDesign, setNewDesign] = useState({
    textContent: '',
    fontSize: 0,
    position: '',
    fontId: '',
    clipartId: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch designs from the backend
  const fetchDesigns = async () => {
    try {
      const response = await api.get('/designs');
      setDesigns(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch designs.');
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // Handle form submission for creating/updating designs
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editMode) {
        // Update design
        await api.put(`/designs/id=${editId}`, newDesign);
      } else {
        // Create new design
        await api.post('/designs', newDesign);
      }

      // Refresh designs list after adding or updating
      fetchDesigns();

      // Reset the form
      setNewDesign({
        textContent: '',
        fontSize: 0,
        position: '',
        fontId: '',
        clipartId: '',
      });
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setError('Failed to submit design data.');
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await api.delete(`/designs/id=${id}`);
      fetchDesigns(); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete design.');
    }
  };

  // Handle edit operation
  const handleEdit = (design) => {
    setNewDesign({
      textContent: design.textContent,
      fontSize: design.fontSize,
      position: design.position,
      fontId: design.fontId,
      clipartId: design.clipartId,
    });
    setEditMode(true);
    setEditId(design._id);
  };

  return (
    <Container>
      <h1>Admin Designs</h1>

      {error && <Error>{error}</Error>}

      <Form onSubmit={handleSubmit}>
        <h3>{editMode ? 'Update Design' : 'Add New Design'}</h3>
        <InputWrapper>
          <label>Text Content</label>
          <input
            type="text"
            value={newDesign.textContent}
            onChange={(e) => setNewDesign({ ...newDesign, textContent: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Font Size</label>
          <input
            type="number"
            value={newDesign.fontSize}
            onChange={(e) => setNewDesign({ ...newDesign, fontSize: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Position</label>
          <input
            type="text"
            value={newDesign.position}
            onChange={(e) => setNewDesign({ ...newDesign, position: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Font ID</label>
          <input
            type="text"
            value={newDesign.fontId}
            onChange={(e) => setNewDesign({ ...newDesign, fontId: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Clipart ID</label>
          <input
            type="text"
            value={newDesign.clipartId}
            onChange={(e) => setNewDesign({ ...newDesign, clipartId: e.target.value })}
          />
        </InputWrapper>
        <Button type="submit">{editMode ? 'Update Design' : 'Add Design'}</Button>
      </Form>

      <TableWrapper>
        <h2>Designs List</h2>
        <table>
          <thead>
            <tr>
              <th>Text Content</th>
              <th>Font Size</th>
              <th>Position</th>
              <th>Font ID</th>
              <th>Clipart ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {designs.map((design) => (
              <tr key={design._id}>
                <td>{design.textContent}</td>
                <td>{design.fontSize}</td>
                <td>{design.position}</td>
                <td>{design.fontId}</td>
                <td>{design.clipartId}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(design)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDelete(design._id)} delete>Delete</ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </Container>
  );
};

export default AdminDesigns;

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

