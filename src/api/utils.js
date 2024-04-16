// httpService.js
import axios from 'axios';
import {getToken} from "~/utils/auth";

// 创建axios实例
const service = axios.create({
    baseURL: 'https://ppcat.fun/', // 设置请求的基础URL
    timeout: 5000, // 设置请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 例如添加请求头、身份验证等
        config.headers['Content-Type'] = 'application/json'
        if (getToken()) {
            config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.error('Request error:', error); // for debug
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        // 对响应错误做点什么
        console.error('Response error:', error); // for debug
        return Promise.reject(error);
    }
);

export default service;
