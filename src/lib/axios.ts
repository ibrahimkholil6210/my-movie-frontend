import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:4000/api/v1",
};
const client: AxiosInstance = axios.create(config);


client.interceptors.request.use((config) => {
  
  if(localStorage.getItem('token')){
    // @ts-ignore
    config.headers.common.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token') || '')}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default client;
