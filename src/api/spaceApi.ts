import axios from 'axios';
import { endpoints } from 'src/utils/axios';

export const GetSpace = async () => {
  const response = await axios.get(endpoints.space.list);
  return response;
};
