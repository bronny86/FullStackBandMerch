//test//

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

const OrderCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
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

  &.delete,
  &.create,
  &.cancel {
    background-color: #000;
    &:hover {
      background-color: #333;
    }
  }

  &.paid {
    background-color: #007bff;
    &:hover {
      background-color: #0056b3;
    }
  }

  &.shipped {
    background-color: #28a745;
    &:hover {
      background-color: #218838;
    }
  }

  &.cancelled {
    background-color: #ffc107;
    &:hover {
      background-color: #e0a800;
    }
  }

  &.deleteRed {
    background-color: red;
    &:hover {
      background-color: darkred;
    }
  }

  /* Styling for the Delete and Cancel buttons inside modal */
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

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
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
  white-space: nowrap; /* Prevent text from wrapping */
`;

const SubHeading = styled.h3`
  margin-top: 20px;
  font-size: 18px;
`;

const CreateOrderHeading = styled.h2`
  margin-top: 20px;
  font-size: 20px;
  color: #333;
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
  resize: none;  /* Disable resizing */
`;

const DeletionModalButtons = styled.div`
  margin-top: 20px;
`;

const CurrentOrdersHeading = styled.h2`
  margin-top: 30px;
  text-align: center;
  font-size: 24px;
  color: #333;
`;

const AdminOrdersDiv = styled.div`
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  padding-top: 20px;
`;

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deletedOrders, setDeletedOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [newOrder, setNewOrder] = useState({
    userId: "",
    designId: "",
    tshirtId: "",
    quantity: 1,
    totalPrice: 0,
    orderDate: new Date().toISOString(),
    orderStatus: "Pending",
  });
  const [sortOption, setSortOption] = useState("orderDate");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders?sort=${sortOption}`);
      setOrders(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch deleted orders
  const fetchDeletedOrders = async () => {
    try {
      const response = await api.get("/orders/deleted");
      setDeletedOrders(response.data);
    } catch (err) {
      setError("Failed to fetch deleted orders.");
    }
  };

  // Create a new order
  const createOrder = async () => {
    try {
      const response = await api.post("/orders", newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({
        userId: "",
        designId: "",
        tshirtId: "",
        quantity: 1,
        totalPrice: 0,
        orderDate: new Date().toISOString(),
        orderStatus: "Pending",
      });
    } catch (err) {
      setError("Failed to create order.");
    }
  };

  // Update the order status
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const allowedStatuses = ["Pending", "Paid", "Shipped", "Cancelled"];
      if (!allowedStatuses.includes(newStatus)) {
        throw new Error("Invalid order status.");
      }

      const response = await api.put(`/orders/id=${id}`, { orderStatus: newStatus });

      const updatedOrders = orders.map(order =>
        order._id === id ? { ...order, orderStatus: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      setError("Failed to update order status.");
    }
  };

  // Delete an order (soft delete)
  const deleteOrder = async () => {
    if (!deleteReason) {
      setError("Failed to delete order. Deletion reason required.");
      return;
    }

    try {
      const response = await api.delete(`/orders/id=${orderToDelete}`, { data: { reason: deleteReason } });
      setOrders(orders.filter(order => order._id !== orderToDelete));
      fetchDeletedOrders();  // Fetch the latest deleted orders
      setDeleteReason("");  // Clear delete reason input
      setShowDeleteModal(false);  // Close modal after deletion
    } catch (err) {
      setError("Failed to delete order.");
    }
  };

  // Handle sort option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    fetchOrders();  // Fetch orders with the new sort option
  };

  useEffect(() => {
    fetchOrders();
    fetchDeletedOrders();
  }, [sortOption]);

  return (
    <Container>
      <Title>Admin Orders</Title>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div>
          <CreateOrderHeading>Create New Order</CreateOrderHeading>
          <FormContainer>
            <h3>User ID:</h3>
            <Input
              type="text"
              value={newOrder.userId}
              onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
              placeholder="Enter User ID"
            />
            <h3>Design ID:</h3>
            <Input
              type="text"
              value={newOrder.designId}
              onChange={(e) => setNewOrder({ ...newOrder, designId: e.target.value })}
              placeholder="Enter Design ID"
            />
            <h3>T-Shirt ID:</h3>
            <Input
              type="text"
              value={newOrder.tshirtId}
              onChange={(e) => setNewOrder({ ...newOrder, tshirtId: e.target.value })}
              placeholder="Enter T-Shirt ID"
            />
            <h3>Quantity:</h3>
            <Input
              type="number"
              value={newOrder.quantity}
              onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
              placeholder="Enter Quantity"
            />
            <h3>Total Price:</h3>
            <Input
              type="number"
              value={newOrder.totalPrice}
              onChange={(e) => setNewOrder({ ...newOrder, totalPrice: e.target.value })}
              placeholder="Enter Total Price"
            />
            <h3>Order Date:</h3>
            <Input
              type="date"
              value={newOrder.orderDate}
              onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
            />
            <h3>Status:</h3>
            <select
              value={newOrder.orderStatus}
              onChange={(e) => setNewOrder({ ...newOrder, orderStatus: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <Button className="create" onClick={createOrder}>
              Create Order
            </Button>
          </FormContainer>

          <CurrentOrdersHeading>Current Orders</CurrentOrdersHeading>
          <SubHeading>Sort Data By</SubHeading>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="orderDate">Order Date</option>
            <option value="totalPrice">Total Price</option>
          </select>

          <AdminOrdersDiv>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Order ID</TableHeader>
                  <TableHeader>User ID</TableHeader>
                  <TableHeader>Design ID</TableHeader>
                  <TableHeader>T-Shirt ID</TableHeader>
                  <TableHeader>Order Status</TableHeader>
                  <TableHeader>Total Price</TableHeader>
                  <TableHeader>Order Date</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>{order.designId}</TableCell>
                    <TableCell>{order.tshirtId}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        className="paid"
                        onClick={() => updateOrderStatus(order._id, "Paid")}
                      >
                        Mark as Paid
                      </Button>
                      <Button
                        className="shipped"
                        onClick={() => updateOrderStatus(order._id, "Shipped")}
                      >
                        Mark as Shipped
                      </Button>
                      <Button
                        className="cancelled"
                        onClick={() => updateOrderStatus(order._id, "Cancelled")}
                      >
                        Cancel Order
                      </Button>
                      <Button className="deleteRed" onClick={() => {
                        setShowDeleteModal(true);
                        setOrderToDelete(order._id);
                      }}>
                        Delete Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </AdminOrdersDiv>
          
          <SubHeading>Deleted Orders</SubHeading>
          <Table>
            <thead>
              <tr>
                <TableHeader>Order ID</TableHeader>
                <TableHeader>User ID</TableHeader>
                <TableHeader>Reason</TableHeader>
                <TableHeader>Deletion Date</TableHeader>
              </tr>
            </thead>
            <tbody>
              {deletedOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{order.deletionReason}</TableCell>
                  <TableCell>{new Date(order.deletedAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          <DeletionModal show={showDeleteModal}>
            <ModalContainer>
              <h3>Enter Deletion Reason</h3>
              <DeletionReasonInput
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Enter reason for deletion..."
              />
              <DeletionModalButtons>
                <Button className="modalButton" onClick={deleteOrder}>Delete Order</Button>
                <Button className="modalButtonCancel" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              </DeletionModalButtons>
            </ModalContainer>
          </DeletionModal>
        </div>
      )}
    </Container>
  );
};

export default AdminOrders;
