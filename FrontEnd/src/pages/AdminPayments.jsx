import React, { useState, useEffect } from "react";
import api from "../api";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 150px;
  margin: 5px;

  &.deleteRed {
    background-color: red;
    &:hover {
      background-color: darkred;
    }
  }

  &.modalButton {
    background-color: #000;
    color: white;
    font-size: 16px;
    padding: 12px 20px;
    width: 100%;
    margin: 10px 0;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }

  &.modalButtonCancel {
    background-color: #000;
    color: white;
    font-size: 16px;
    padding: 12px 20px;
    width: 100%;
    margin: 10px 0;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  overflow-x: auto;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 12px;
  text-align: left;
`;

const TableRow = styled.tr`
  background-color: #fff;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

const SubHeading = styled.h3`
  margin-top: 20px;
  font-size: 18px;
`;

const DeletionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const DeletionReasonInput = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
  resize: none;
`;

const DeletionModalButtons = styled.div`
  margin-top: 20px;
`;

const AdminOrdersDiv = styled.div`
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  padding-top: 20px;
`;

export const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [deletedPayments, setDeletedPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [sortOption, setSortOption] = useState("createdAt");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  // Fetch all payments
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/payments?sort=${sortOption}`);
      setPayments(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch payments.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch deleted payments
  const fetchDeletedPayments = async () => {
    try {
      const response = await api.get("/payments/deleted");
      setDeletedPayments(response.data);
    } catch (err) {
      setError("Failed to fetch deleted payments.");
    }
  };

  // Delete payment (soft delete)
  const deletePayment = async () => {
    if (!deleteReason) {
      setError("Deletion reason required.");
      return;
    }

    try {
      const response = await api.delete(`/payments/id=${paymentToDelete}`, {
        data: { reason: deleteReason },
      });
      setPayments(payments.filter((payment) => payment._id !== paymentToDelete));
      fetchDeletedPayments(); // Fetch the latest deleted payments
      setShowDeleteModal(false); // Close modal after deletion
      setDeleteReason(""); // Clear delete reason input
    } catch (err) {
      setError("Failed to delete payment.");
    }
  };

  // Handle sort option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    fetchPayments(); // Fetch payments with the new sort option
  };

  useEffect(() => {
    fetchPayments();
    fetchDeletedPayments();
  }, [sortOption]);

  return (
    <Container>
      <Title>Admin Payments</Title>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div>
          <SubHeading>Sort Data By</SubHeading>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="createdAt">Date</option>
            <option value="paymentMethod">Payment Method</option>
          </select>

          <AdminOrdersDiv>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Payment ID</TableHeader>
                  <TableHeader>User ID</TableHeader>
                  <TableHeader>Payment Method</TableHeader>
                  <TableHeader>Transaction ID</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{payment._id}</TableCell>
                    <TableCell>{payment.userId}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>{payment.transactionId}</TableCell>
                    <TableCell>
                      <Button
                        className="deleteRed"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setPaymentToDelete(payment._id);
                        }}
                      >
                        Delete Payment
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </AdminOrdersDiv>

          <SubHeading>Deleted Payments</SubHeading>
          <Table>
            <thead>
              <tr>
                <TableHeader>Payment ID</TableHeader>
                <TableHeader>User ID</TableHeader>
                <TableHeader>Reason</TableHeader>
                <TableHeader>Deletion Date</TableHeader>
              </tr>
            </thead>
            <tbody>
              {deletedPayments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment._id}</TableCell>
                  <TableCell>{payment.userId}</TableCell>
                  <TableCell>{payment.deletionReason}</TableCell>
                  <TableCell>{new Date(payment.deletedAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          {/* Delete Payment Modal */}
          <DeletionModal show={showDeleteModal}>
            <ModalContainer>
              <h3>Enter Deletion Reason</h3>
              <DeletionReasonInput
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Enter reason for deletion..."
              />
              <DeletionModalButtons>
                <Button className="modalButton" onClick={deletePayment}>
                  Confirm Delete
                </Button>
                <Button
                  className="modalButtonCancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
              </DeletionModalButtons>
            </ModalContainer>
          </DeletionModal>
        </div>
      )}
    </Container>
  );
};

export default AdminPayments;
