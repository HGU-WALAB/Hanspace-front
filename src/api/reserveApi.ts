import axiosInstance, { endpoints } from 'src/utils/axios';
import { ICalendarEvent } from 'src/types/calendar';
import { palette as themePalette } from 'src/theme/palette';
import { isEmpty } from 'lodash';

const palette = themePalette('light');

// dashboard calander (ReserveFindeByDeptId)
export const GetReserveListByDept = async (deptId: number) => {
  const response = axiosInstance.get(`${endpoints.reserve.list}/${deptId}`); // DeptId 전체 리스트 (admin)
  
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
  }))
 
  return selectData;
};

// dashboard calander (ReserveFindeByMember)
export const GetReserveListByMember = async (deptId: number) => {
  const response = axiosInstance.get(`${endpoints.reserve.member}/1`); // Member 예약 전체 리스트 (admin)
  
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
  }))
 
  return selectData;
};