import axios from 'axios';

// Change this URL to the correct path and port of your API
const API_BASE_URL = 'http://localhost:5000/';  // Update this to backend port

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,  // Increase timeout to allow more time for requests
  headers: { 'Content-Type': 'application/json' },
});

export default api;
