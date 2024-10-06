import axios from "axios";
import {Message} from "@arco-design/web-vue";
import {getToken} from "../utils/auth";

if (import.meta.env.VITE_API_BASE_URL) {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}
const request = axios.create({
    timeout: 5000,
});
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
        if (!config.headers) {
            config.headers = {} as any;
        }

        config.headers.Authorization = `${token}`;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    const res = response.data;
    // 错误信息提示
    if (res.code !== 0) {
        Message.error({
            content: res.message || 'Error',
            duration: 5 * 1000,
        });
        return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message.error({
        content: error.message || 'Error',
        duration: 5 * 1000,
    });
    return Promise.reject(error);
});

export default request;
