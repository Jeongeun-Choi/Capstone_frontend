import axios from 'axios';
import { NODE_ENV } from '../config';

const baseURL =
  NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://modugroup.tk/api';

const customAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

// baseURL: 'http://localhost:5000/api'
export default customAxios;
