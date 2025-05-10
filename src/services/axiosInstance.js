// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9090/api/micromart', // adjust at deployment use as .env
});

instance.interceptors.request.use(
  (config)=>{
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (err)=>{
    return Promise.reject(err);
  }
)
export default instance;
