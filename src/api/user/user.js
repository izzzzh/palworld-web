import request from "../utils"
// const service = axios.create({
//     baseURL: 'http://127.0.0.1:8888/', // 设置请求的基础URL
//     timeout: 5000, // 设置请求超时时间
// });
//
// service.interceptors.response.use(
//     response => {
//         // 对响应数据做点什么
//         return response.data;
//     },
//     error => {
//         // 对响应错误做点什么
//         console.error('Response error:', error); // for debug
//         return Promise.reject(error);
//     }
// );

export function login(data) {
    return request({
        url: 'api/v1/user/login',
        method: 'post',
        data: data
    })
}

export function getCaptcha() {
    return request({
        url: 'api/v1/user/captcha',
        method: 'get',
    })
}

export function register(data) {
    return request({
        url: 'api/v1/user/register',
        method: 'post',
        data: data,
    })
}

export function getUserInfo(id) {
    return request({
        url: 'api/v1/user/info/' + id,
        method: 'get',
    })
}

export function listUser(params) {
    return request({
        url: 'api/v1/user/',
        method: 'get',
        params: params
    })
}
