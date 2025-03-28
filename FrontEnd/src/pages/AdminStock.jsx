import React, { useState, useEffect } from "react";
import api from "../api"; // Assuming the API is already set up

export const AdminStock = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ tshirtBrand: "", tshirtColor: "", stockQuantity: 0 });
  const [editingStock, setEditingStock] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("tshirtBrand");

  // Fetch all stock items
  const fetchStock = async () => {
    setLoading(true);
    try {
      const response = await api.get("/stocks");
      setStocks(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch stock items.");
    } finally {
      setLoading(false);
    }
  };

  // Create new stock item
  const createStock = async () => {
    try {
      const response = await api.post("/stocks", newStock);
      setStocks([...stocks, response.data]);
      setNewStock({ tshirtBrand: "", tshirtColor: "", stockQuantity: 0 });
    } catch (err) {
      setError("Failed to create stock item.");
    }
  };

  // Update stock item
  const updateStock = async () => {
    if (!editingStock) return;

    try {
      const response = await api.put(`/stocks/${editingStock._id}`, editingStock);
      setStocks(stocks.map((stock) => (stock._id === editingStock._id ? response.data : stock)));
      setEditingStock(null);
    } catch (err) {
      setError("Failed to update stock item.");
    }
  };

  // Delete stock item
  const deleteStock = async (id) => {
    try {
      await api.delete(`/stocks/${id}`);
      setStocks(stocks.filter((stock) => stock._id !== id));
    } catch (err) {
      setError("Failed to delete stock item.");
    }
  };

  // Sort stock items by selected option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    const sortedStocks = [...stocks].sort((a, b) => {
      if (e.target.value === "tshirtBrand") return a.tshirtBrand.localeCompare(b.tshirtBrand);
      if (e.target.value === "tshirtColor") return a.tshirtColor.localeCompare(b.tshirtColor);
      return a.stockQuantity - b.stockQuantity;
    });
    setStocks(sortedStocks);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div>
      <h1>Admin Stock Management</h1>

      <div>
        <h3>Sort Data By</h3>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="tshirtBrand">Brand</option>
          <option value="tshirtColor">Color</option>
          <option value="stockQuantity">Stock Quantity</option>
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading stock items...</p>
      ) : (
        <div>
          {/* Create New Stock Form */}
          <h3>Create New Stock Item</h3>
          <input
            type="text"
            placeholder="Brand"
            value={newStock.tshirtBrand}
            onChange={(e) => setNewStock({ ...newStock, tshirtBrand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Color"
            value={newStock.tshirtColor}
            onChange={(e) => setNewStock({ ...newStock, tshirtColor: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newStock.stockQuantity}
            onChange={(e) => setNewStock({ ...newStock, stockQuantity: Number(e.target.value) })}
          />
          <button onClick={createStock}>Create Stock</button>

          {/* Stock Table */}
          <h3>Current Stock Items</h3>
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Color</th>
                <th>Stock Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.tshirtBrand}</td>
                  <td>{stock.tshirtColor}</td>
                  <td>{stock.stockQuantity}</td>
                  <td>
                    <button onClick={() => setEditingStock(stock)}>Edit</button>
                    <button onClick={() => deleteStock(stock._id)} style={{ backgroundColor: "red", color: "white" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Stock Modal */}
          {editingStock && (
            <div>
              <h3>Edit Stock Item</h3>
              <input
                type="text"
                placeholder="Brand"
                value={editingStock.tshirtBrand}
                onChange={(e) => setEditingStock({ ...editingStock, tshirtBrand: e.target.value })}
              />
              <input
                type="text"
                placeholder="Color"
                value={editingStock.tshirtColor}
                onChange={(e) => setEditingStock({ ...editingStock, tshirtColor: e.target.value })}
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={editingStock.stockQuantity}
                onChange={(e) => setEditingStock({ ...editingStock, stockQuantity: Number(e.target.value) })}
              />
              <button onClick={updateStock}>Save Changes</button>
              <button onClick={() => setEditingStock(null)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStock;
