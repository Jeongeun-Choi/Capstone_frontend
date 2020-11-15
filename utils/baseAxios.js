import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_SERVER
    : process.env.PROD_SERVER;

const customAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

export default customAxios;
