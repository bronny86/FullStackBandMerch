// src/pages/AdminFonts.jsx
import React, { useState, useEffect } from 'react';
import api from '../api'; // Assuming api is set up to communicate with the backend
import styled from 'styled-components';

const AdminFonts = () => {
  const [fonts, setFonts] = useState([]);
  const [newFont, setNewFont] = useState({
    fontName: '',
    fontStyle: '',
    fontCost: 0,
    fontColor: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch fonts from the backend
  const fetchFonts = async () => {
    try {
      const response = await api.get('/fonts');
      setFonts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch fonts.');
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  // Handle form submission for creating/updating fonts
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editMode) {
        // Update font item
        await api.put(`/fonts/id=${editId}`, newFont);
      } else {
        // Create new font item
        await api.post('/fonts', newFont);
      }

      // Refresh fonts list after adding or updating
      fetchFonts();

      // Reset the form
      setNewFont({ fontName: '', fontStyle: '', fontCost: 0, fontColor: '' });
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setError('Failed to submit font data.');
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await api.delete(`/fonts/id=${id}`);
      fetchFonts(); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete font item.');
    }
  };

  // Handle edit operation
  const handleEdit = (font) => {
    setNewFont({
      fontName: font.fontName,
      fontStyle: font.fontStyle,
      fontCost: font.fontCost,
      fontColor: font.fontColor,
    });
    setEditMode(true);
    setEditId(font._id);
  };

  return (
    <Container>
      <h1>Admin Fonts</h1>

      {error && <Error>{error}</Error>}

      <Form onSubmit={handleSubmit}>
        <h3>{editMode ? 'Update Font' : 'Add New Font'}</h3>
        <InputWrapper>
          <label>Font Name</label>
          <input
            type="text"
            value={newFont.fontName}
            onChange={(e) => setNewFont({ ...newFont, fontName: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Font Style</label>
          <input
            type="text"
            value={newFont.fontStyle}
            onChange={(e) => setNewFont({ ...newFont, fontStyle: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Font Color</label>
          <input
            type="text"
            value={newFont.fontColor}
            onChange={(e) => setNewFont({ ...newFont, fontColor: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Font Cost</label>
          <input
            type="number"
            value={newFont.fontCost}
            onChange={(e) => setNewFont({ ...newFont, fontCost: e.target.value })}
          />
        </InputWrapper>
        <Button type="submit">{editMode ? 'Update Font' : 'Add Font'}</Button>
      </Form>

      <TableWrapper>
        <h2>Font List</h2>
        <table>
          <thead>
            <tr>
              <th>Font Name</th>
              <th>Font Style</th>
              <th>Font Color</th>
              <th>Font Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fonts.map((font) => (
              <tr key={font._id}>
                <td>{font.fontName}</td>
                <td>{font.fontStyle}</td>
                <td>{font.fontColor}</td>
                <td>${font.fontCost}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(font)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDelete(font._id)} delete>
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

export default AdminFonts;

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
  th,
  td {
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
