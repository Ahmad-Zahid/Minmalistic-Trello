import axios from 'axios';

const { REACT_APP_API_URL } = process.env

const API = axios.create({
  baseURL: REACT_APP_API_URL,
  responseType: 'json',
});

export default API
