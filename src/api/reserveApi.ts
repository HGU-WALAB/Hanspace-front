import axiosInstance, { endpoints } from 'src/utils/axios';

export const GetReserve = async () => {
  const response = await axiosInstance.get(endpoints.reserve.list); // spaceId = 1
  return response;
};
