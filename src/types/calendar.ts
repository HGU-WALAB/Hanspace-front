// ----------------------------------------------------------------------

export type ICalendarFilterValue = string[] | Date | null;

export type ICalendarFilters = {
  colors: string[];
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type ICalendarDate = string | number;

export type ICalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
export type UCalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type ICalendarRange = {
  start: ICalendarDate;
  end: ICalendarDate;
} | null;

// export type ICalendarEvent = {
//   start: ICalendarDate;
//   end: ICalendarDate;
//   color: string;
//   title: string;
//   description: string;
//   allDay: boolean;
// };

export type ICalendarEvent = {
  id: string;
  reserveDate: string;
  start: ICalendarDate;
  end: ICalendarDate;
  color: string;
  textColor: string;
  purpose: string;
  status: boolean;
  spaceName: string;
  allDay: boolean;
};

export type UCalendarEvent = {
  id: string;
  color: string;
  title: string;
  allDay: boolean;
  description: string;
  end: ICalendarDate;
  start: ICalendarDate;
};
