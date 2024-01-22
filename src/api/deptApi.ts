import { IDeptAdd, IDeptRead } from 'src/types/dept';
import axiosInstance, { endpoints } from 'src/utils/axios';

// ToDo: backend에서 개발 완료 되면 연결해보기
export const updateDept = async (data: IDeptRead, deptId: Number) => {
  console.log('수정할 기관 정보', data);
  const response = axiosInstance.patch(`${endpoints.dept.update}/${deptId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
