import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.xxoo.team/hero/",
  timeout: 8000,
});

instance.interceptors.request.use(function (config) {
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error);
    return error
  },
);

export default instance;
