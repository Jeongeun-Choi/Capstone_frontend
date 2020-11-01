import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://modugroup.tk/api'
});

// baseURL: 'http://localhost:5000/api'
export default customAxios;
