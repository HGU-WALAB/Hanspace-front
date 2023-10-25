import axios from 'axios';
import { endpoints } from 'src/utils/axios';

export const GetUser = async () => {
  const response = await axios.get(endpoints.user.list);
  return response;
};
