import axios from 'axios';

// Change this URL to the correct path and port of your API
const API_BASE_URL = 'http://localhost:5173/';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
});

export default api;