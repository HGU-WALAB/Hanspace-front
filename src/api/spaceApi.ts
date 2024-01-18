import axiosInstance, { endpoints } from 'src/utils/axios';

export const GetSpace = async (deptId: number) => {
  const response = await axiosInstance.get(`${endpoints.space.list}/${deptId}`);
  return response;
};
