import axios from 'axios';

const api = axios.create({
  baseURL: "http://www.phonegap100.com/",
  timeout: 1000
});


export default api;