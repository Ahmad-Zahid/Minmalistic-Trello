import axios from 'axios';

const BASE_URL = "https://randomuser.me/api"

const API = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
});

export default API