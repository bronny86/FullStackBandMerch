import React, { useState } from "react";
import api from "../api"; // Axios instance
import styled from "styled-components";

// Styled components for layout
const OrderList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 80px; /* Added margin-top to avoid the header overlapping */
`;

const OrderItem = styled.li`
  background-color: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const OrderHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const OrderDetails = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

const OrderStatus = styled.span`
  font-weight: bold;
  color: ${props => (props.status === "Pending" ? "orange" : "green")};
`;

const OrderTotal = styled.span`
  font-weight: bold;
  color: #333;
  margin-left: 10px;
`;

const ButtonContainer = styled.div`
  margin: 20px 0;
`;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders function
  const fetchOrders = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      console.log("Fetching orders...");
      const response = await api.get("/orders");
      console.log("Fetched orders:", response.data); // Log the full response
      setOrders(response.data.data); // Access orders from the 'data' field
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Orders</h1>

      {/* Buttons for "Get Orders" and "Refresh Orders" */}
      <ButtonContainer>
        <button onClick={fetchOrders} disabled={loading}>
          {loading ? "Loading..." : "Get Orders"}
        </button>
        <button onClick={fetchOrders} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Orders"}
        </button>
      </ButtonContainer>

      {/* Display orders only after clicking "Get Orders" */}
      <OrderList>
        {error && <div>{error}</div>}
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderItem key={order._id}>
              <OrderHeader>
                Order ID: {order._id} | User ID: {order.userId}
              </OrderHeader>
              <OrderDetails>
                <div>
                  <OrderStatus status={order.orderStatus}>
                    Status: {order.orderStatus}
                  </OrderStatus>
                  <OrderTotal>Total Price: ${order.totalPrice.toFixed(2)}</OrderTotal>
                </div>
                <div>Order Date: {new Date(order.orderDate).toLocaleDateString()}</div>
              </OrderDetails>
            </OrderItem>
          ))
        ) : (
          <div>No orders found</div>
        )}
      </OrderList>
    </div>
  );
};

export default AdminOrders;
