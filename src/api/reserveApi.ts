import axiosInstance, { endpoints } from 'src/utils/axios';
import { ICalendarEvent } from 'src/types/calendar';
import { palette as themePalette } from 'src/theme/palette';
import { isEmpty } from 'lodash';

const palette = themePalette('light');

// dashboard calander (ReserveFindeBySpaceId)
export const GetReserveListBySpace = async () => {
  const response = axiosInstance.get(endpoints.reserve.schedule);
  
  const selectData: ICalendarEvent[] = (await response).data.map((item: any) => ({
    id: item.id,
    reserveDate: item.reserveDate,
    start: new Date(`${item.reserveDate} ${item.startTime}`).getTime(),
    end: new Date(`${item.reserveDate} ${item.endTime}`).getTime(),
    color: palette.secondary.main, // to be continue..
    textColor: palette.secondary.main, // to be continue..
    purpose: item.purpose,
    status: item.status,
    spaceName: item.space?.name,
  }))
 
  return selectData;
};
