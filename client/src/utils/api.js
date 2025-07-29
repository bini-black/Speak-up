import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // e.g. http://localhost:5000/api
  withCredentials: true,  // if your backend uses cookies or sessions
});

export default api;
