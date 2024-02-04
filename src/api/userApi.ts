import axiosInstance, { endpoints } from 'src/utils/axios';

export const GetFirstInfo = async () => {
  const response = axiosInstance.get(endpoints.auth.info);
  return response;
};

export const GetMyDept = async () => {
  const response = axiosInstance.get(endpoints.dept.mylist);
  return response;
};
