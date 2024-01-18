import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API, BASE_URL } from 'src/config-global';

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API });
const axiosInstance = axios.create({ baseURL: BASE_URL });

// const deptId = localStorage.getItem('DeptUrlState');
// console.log('deptId', deptId);
// const UserId = localStorage.getItem('userId');

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/hanSpace/login',
    register: '/api/auth/register',
    info: '/hanSpace/info',
  },
  reserve: {
    list: `/hanSpace/reserve`,
    schedule: `/hanSpace/reserve/list/1`,
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  space: {
    list: `/hanSpace/space`,
    create: `/hanSpace/space`,
    edit: `/hanSpace/space`,
    delete: `/hanSpace/space`,
  },
  user: {
    list: `/deptMember/list`,
    update: `/deptMember`,
  },
  dept: {
    signup: '/hanSpace/member/signup',
    add: '/hanSpace/member/add',
  },
};
