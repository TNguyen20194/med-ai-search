import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
})

// set interceptors later
/**
 * example api.interceptors.request.use(
 *   (config) => {
 *     // Do something before request is sent
 *     return config;
 *   },
 *   (error) => {
 *     // Do something with request error
 *     return Promise.reject(error);
 *   }
 * );
 */

export default api