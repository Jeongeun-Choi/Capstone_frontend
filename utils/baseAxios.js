import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://49.50.173.83:5000/api'
});

// baseURL: 'http://localhost:5000/api'
export default customAxios;
