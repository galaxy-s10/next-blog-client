import axios from 'axios';

const config = {
  // baseURL: '/api/', // 本地开发：/api/，线上正式服：/prodapi/，线上测试服：/betaapi/
  timeout: 5000,
};

const service: any = axios.create(config);

// 请求拦截
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  // eslint-disable-next-line consistent-return
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
