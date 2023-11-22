import axiosInstance, { endpoints } from 'src/utils/axios';

// TODO : Add type
export const userLogin = async (data: any) => {
  const response = axiosInstance.post(endpoints.auth.login, data);

  return response;
};

// export const GetUser = async () => {
//   const response = await axios.get(endpoints.user.list);
//   return response;
// };
