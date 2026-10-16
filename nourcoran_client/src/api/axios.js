import axios from "axios";
import { config } from "../../../../backend/src/config/conf.config";
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers:{
        "Content-Type": 'applicatoion/json',
    }
});
api.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, (error)=>{
    return Promise.reject(error);
});

export default api;