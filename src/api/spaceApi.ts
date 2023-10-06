import axios from 'axios';

export const GetSpace = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/space/list`);
  return response;
};
