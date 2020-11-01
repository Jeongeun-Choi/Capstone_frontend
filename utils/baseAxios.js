import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://modugroup.tk/api';

const customAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// baseURL: 'http://localhost:5000/api'
export default customAxios;
