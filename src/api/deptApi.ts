import { IDeptAdd } from 'src/types/dept';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const createDept = async (data: IDeptAdd) => {
    console.log("추가로 저장되는 기관들 정보 확인", data);
    const response = axiosInstance.post(endpoints.dept.create, data);
    return response;
};
