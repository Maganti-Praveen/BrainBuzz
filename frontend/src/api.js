import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: { 'Content-Type': 'application/json' },
});

console.log("✅ API URL is:", import.meta.env.VITE_API_URL);

export default API;
