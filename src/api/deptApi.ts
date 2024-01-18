import { IDeptAdd, IDeptRead } from 'src/types/dept';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const createDept = async (data: IDeptAdd) => {
  // console.log("추가로 저장되는 기관들 정보 확인", data);
  const response = await axiosInstance.post(endpoints.dept.create, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

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
