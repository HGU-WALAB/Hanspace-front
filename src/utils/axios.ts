import axios, { AxiosRequestConfig } from 'axios';
// config
import { BASE_URL } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL });

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
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/hanSpace/login',
    register: '/hanSpace/member/signup',
    info: '/hanSpace/info',
  },
  reserve: {
    list: `/hanSpace/reserve`, // deptId
    schedule: `/hanSpace/reserve/list`, // spaceId
    member: `hanSpace/reserve/list/member`, // member
    deptmember: `hanSpace/reserve/member`, // member by deptId
    edit: `/hanSpace/reserve`, // reserveId
    delete: `/hanSpace/reserve`, // reserveId
    create: `/hanSpace/reserve`,
    regularcreate: `/hanSpace/reserve/regularReserve`,
    datelist: `/hanSpace/reserve/date`, // deptId
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
    list: `/hanSpace/deptMember/list`, // deptId
    update: `/deptMember`,
  },
  dept: {
    signup: '/hanSpace/member/signup',
    add: '/hanSpace/member/add',
    // ToDo: backend api 완료 되면 다시 연결해서 확인하기
    create: `/hanSpace/dept`,
    update: `/hanSpace/dept`,
  },
};
