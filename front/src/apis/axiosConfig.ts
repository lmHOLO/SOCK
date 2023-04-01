import axios, { AxiosInstance } from 'axios';
export function apiInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  return instance;
}
export function authApiInstance(): AxiosInstance {
  const token = window.localStorage.getItem('token');
  // console.log(token);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
  });
  return instance;
}
