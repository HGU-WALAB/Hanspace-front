import axios from 'axios';
import { BASE_URL } from 'src/config-global';

export const GetSpace = async () => {
  const response = await axios.get(`${BASE_URL}/space/list`);
  return response;
};
