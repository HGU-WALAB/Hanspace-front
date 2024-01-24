import axiosInstance, { endpoints } from 'src/utils/axios';
import { ICalendarEvent } from 'src/types/calendar';
import { palette as themePalette } from 'src/theme/palette';
import { isEmpty } from 'lodash';
import { DailyReserveAdd, RegularReserveAdd } from 'src/types/reserve';

const palette = themePalette('light');

// dashboard calander (ReserveFindeByDeptId)
export const GetReserveListByDept = async (deptId: number) => {
  const response = axiosInstance.get(`${endpoints.reserve.list}/${deptId}`); // DeptId 전체 리스트 (관리자)

  const selectData: ICalendarEvent[] = (await response).data.map((item: any) => ({
    id: item.id,
    reserveDate: item.reserveDate,
    start: new Date(`${item.reserveDate} ${item.startTime}`).getTime(),
    end: new Date(`${item.reserveDate} ${item.endTime}`).getTime(),
    color: palette.secondary.main, // to be continue..
    textColor: palette.secondary.main, // to be continue..
    title: item.purpose,
    status: item.status,
    spaceName: item.space?.name,
  }));

  return selectData;
};

// dashboard calander (ReserveFindeByMember)
export const GetReserveListByMember = async (deptId: number) => {
  const response = axiosInstance.get(`${endpoints.reserve.deptmember}/${deptId}`); // Member 예약 전체 리스트 (user)

  const selectData: ICalendarEvent[] = (await response).data.map((item: any) => ({
    id: item.reserveId,
    reserveDate: item.reserveDate,
    start: new Date(`${item.reserveDate} ${item.startTime}`).getTime(),
    end: new Date(`${item.reserveDate} ${item.endTime}`).getTime(),
    color: palette.secondary.main, // to be continue..
    textColor: palette.secondary.main, // to be continue..
    title: item.purpose,
    status: item.status,
    spaceName: item.spaceName,
  }));

  return selectData;
};

// reserve list (spadeId)
export const GetReserve = async (spaceId: number) => {
  const response = await axiosInstance.get(`${endpoints.reserve.schedule}/${spaceId}`);
  return response;
};

// daily reserve
export const createReserve = async (data: DailyReserveAdd) => {
  console.log('예약 추가 정보 확인', data);
  const response = await axiosInstance.post(endpoints.reserve.create, data);
  return response;
};

// regularly reserve
export const regularCreateReserve = async (data: RegularReserveAdd) => {
  console.log('예약 추가 정보 확인', data);
  const response = await axiosInstance.post(endpoints.reserve.regularcreate, data);
  return response;
};

// reservedlist by date
// ToDo: api 수정 시 date 넘겨주기
export const reservedListByDate = async (deptId: number, selectedDate: string) => {
  const response = await axiosInstance.get(`${endpoints.reserve.datelist}/${deptId}`, {
    params: {
      reserveDate: selectedDate,
    },
  });
  console.log('날짜에 따른 예약된 정보 확인', response);
  return response;
};
