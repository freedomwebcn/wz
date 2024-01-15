import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const service: AxiosInstance = axios.create({
  baseURL: "https://api.xxoo.team/hero/",
  timeout: 3000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  (error: AxiosError) => {
    return error;
  },
);

export default service;
