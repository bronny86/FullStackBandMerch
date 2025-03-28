import React, { useState, useEffect } from 'react';
import api from '../api';  // Assuming api is set up to communicate with backend
import styled from 'styled-components';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [deletedPayments, setDeletedPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    userId: '',
    paymentMethod: '',
    last4Digits: '',
    transactionId: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  const [sortOption, setSortOption] = useState('desc');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [userId, setUserId] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  // Fetch payments from the backend
  const fetchPayments = async () => {
    try {
      const response = await api.get(`/payments?sort=${sortOption}&paymentMethod=${paymentMethod}&userId=${userId}`);
      setPayments(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch payments.');
    }
  };

  const fetchDeletedPayments = async () => {
    try {
      const response = await api.get('/payments/deleted');
      setDeletedPayments(response.data);
    } catch (err) {
      setError('Failed to fetch deleted payments.');
    }
  };

  useEffect(() => {
    fetchPayments();
    if (showDeleted) {
      fetchDeletedPayments();
    }
  }, [sortOption, paymentMethod, userId, showDeleted]);

  // Handle form submission for creating/updating payments
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editMode) {
        await api.put(`/payments/id=${editId}`, newPayment);
      } else {
        await api.post('/payments', newPayment);
      }

      fetchPayments();
      setNewPayment({ userId: '', paymentMethod: '', last4Digits: '', transactionId: '' });
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setError('Failed to submit payment data.');
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    setPaymentToDelete(id);
    setDeleteModalVisible(true); // Open the delete modal
  };

  // Confirm delete with a reason
  const confirmDelete = async () => {
    if (!deleteReason) {
      alert('Please provide a reason for deletion.');
      return;
    }

    try {
      await api.delete(`/payments/id=${paymentToDelete}`, { data: { reason: deleteReason } });
      fetchPayments(); // Refresh the list after deletion
      setDeleteModalVisible(false); // Close the modal
      setDeleteReason(''); // Clear the reason
    } catch (err) {
      setError('Failed to delete payment.');
    }
  };

  // Handle edit operation
  const handleEdit = (payment) => {
    setNewPayment({
      userId: payment.userId,
      paymentMethod: payment.paymentMethod,
      last4Digits: payment.last4Digits,
      transactionId: payment.transactionId,
    });
    setEditMode(true);
    setEditId(payment._id);
  };

  // Toggle deleted payments visibility
  const toggleShowDeleted = () => {
    setShowDeleted(!showDeleted);
  };

  return (
    <Container>
      <h1>Admin Payments</h1>

      {error && <Error>{error}</Error>}

      <Form onSubmit={handleSubmit}>
        <h3>{editMode ? 'Update Payment' : 'Add New Payment'}</h3>
        <InputWrapper>
          <label>User ID</label>
          <input
            type="text"
            value={newPayment.userId}
            onChange={(e) => setNewPayment({ ...newPayment, userId: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Payment Method</label>
          <select
            value={newPayment.paymentMethod}
            onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Invoice">Invoice</option>
          </select>
        </InputWrapper>
        <InputWrapper>
          <label>Last 4 Digits</label>
          <input
            type="text"
            value={newPayment.last4Digits}
            onChange={(e) => setNewPayment({ ...newPayment, last4Digits: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Transaction ID</label>
          <input
            type="text"
            value={newPayment.transactionId}
            onChange={(e) => setNewPayment({ ...newPayment, transactionId: e.target.value })}
          />
        </InputWrapper>
        <Button type="submit">{editMode ? 'Update Payment' : 'Add Payment'}</Button>
      </Form>

      <FilterWrapper>
        <h3>Filter & Sort</h3>
        <div>
          <label>Sort by:</label>
          <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        <div>
          <label>Filter by Payment Method:</label>
          <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
            <option value="">All</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Invoice">Invoice</option>
          </select>
        </div>
        <div>
          <label>Filter by User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={showDeleted}
              onChange={toggleShowDeleted}
            />
            Show Deleted Payments
          </label>
        </div>
      </FilterWrapper>

      <TableWrapper>
        <h2>Payments List</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Payment Method</th>
              <th>Last 4 Digits</th>
              <th>Transaction ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.userId}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.last4Digits}</td>
                <td>{payment.transactionId}</td>
                <td>
                  <ActionButton onClick={() => handleEdit(payment)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDelete(payment._id)} delete>Delete</ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>

      {showDeleted && (
        <TableWrapper>
          <h2>Deleted Payments</h2>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Payment Method</th>
                <th>Last 4 Digits</th>
                <th>Transaction ID</th>
                <th>Deletion Reason</th>
              </tr>
            </thead>
            <tbody>
              {deletedPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.userId}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.last4Digits}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.deletionReason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      )}

      {/* Modal for Deleting Payment */}
      {deleteModalVisible && (
        <Modal>
          <h2>Delete Payment</h2>
          <p>Please provide a reason for deleting this payment:</p>
          <textarea
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            placeholder="Enter reason here"
            rows="4"
            cols="50"
          />
          <div>
            <Button onClick={confirmDelete}>Confirm Delete</Button>
            <Button onClick={() => setDeleteModalVisible(false)}>Cancel</Button>
          </div>
        </Modal>
      )}
    </Container>
  );
};

export default AdminPayments;

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
  input, select {
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

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  width: 400px;
  text-align: center;
`;

const FilterWrapper = styled.div`
  margin-bottom: 20px;
  label {
    font-weight: bold;
  }
  div {
    margin-bottom: 10px;
  }
`;
