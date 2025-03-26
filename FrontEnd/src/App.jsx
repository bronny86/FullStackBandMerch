import React from "react";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom"; 
import api from "./api";

import { useReducer, useState, useEffect } from "react";

import UserDetail from "./components/UserDetail.jsx";
import UserForm from "./components/UserForm.jsx";

import globalReducer, { GlobalContext } from "./reducers/globalReducer";

import { Home } from "./pages/Home"; // Use the imported Home component
import { Cart } from "./pages/Cart";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/Login";
import { GetStarted } from "./pages/GetStarted";

const initialState = {
    token: localStorage.getItem("token") ?? "",
    user: (() => {
        try {
            // Safely parse the user object from localStorage
            return JSON.parse(localStorage.getItem("user")) ?? {};
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            // Fallback to an empty object if parsing fails
            return {};
        }
    })(),
};



function AppContent() {
    const location = useLocation();

    return (
        <div 
            id="root"
            className={location.pathname === "/signup" ? "signup" : ""}
        >
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/GetStarted" element={<GetStarted />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>
    );
}

function App() {
 
    const [store, dispatch] = useReducer(globalReducer, initialState);

    return (
        <Router>
            <AppContent />
            <GlobalContext.Provider value={{ store, dispatch }}>
            <UserForm />
            <UserDetail />
            <UserManagement />
            </GlobalContext.Provider>
        </Router>
    );
}

function UserManagement() {
        const [users, setUsers] = useState([]);
        const [newUser, setNewUser] = useState({ name: '', email: '' });
        const [editingUser, setEditingUser] = useState(null);
    
        useEffect(() => {
            api.get('/users')
              .then(response => {
                // Ensure response.data is an array
                setUsers(Array.isArray(response.data) ? response.data : []);
              })
              .catch(error => {
                console.error('Error fetching users:', error);
                setUsers([]); // Fallback to an empty array on error
              });
        }, []);
    
        const createUser = async (e) => {
            e.preventDefault();
            try {
                const res = await api.post('/users', newUser);
                const user = res.data;
                setNewUser({ name: '', email: '' });
                setUsers([...users, user]);
            } catch (error) {
                console.error('Error creating user:', error);
            }
        };
    
        const updateUser = async (e) => {
            e.preventDefault();
            try {
                const res = await api.put(`/users/${editingUser.id}`, editingUser);
                const user = res.data;
                setEditingUser(null);
                setUsers([...(users.filter(u => u.id !== user.id)), user]);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        };
    
        const deleteUser = async (id) => {
            try {
                await api.delete(`/users/${id}`);
                setUsers(users.filter(u => u.id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };
    
        return (
            <div>
                <h1>User Management</h1>
    
                <h2>Create User</h2>
                <form onSubmit={createUser}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <button type="submit">Create User</button>
                </form>
    
                <h2>User List</h2>
                <ul>
                    {Array.isArray(users) && users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            <button onClick={() => setEditingUser(user)}>Edit</button>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
    
                {editingUser && (
                    <div>
                        <h2>Edit User</h2>
                        <form onSubmit={updateUser}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={editingUser.name}
                                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={editingUser.email}
                                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            />
                            <button type="submit">Update User</button>
                            <button onClick={() => setEditingUser(null)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        );
    }


export default App;