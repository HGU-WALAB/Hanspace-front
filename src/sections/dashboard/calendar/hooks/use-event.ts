import { useMemo } from 'react';
import merge from 'lodash/merge';
// types
import { ICalendarRange, ICalendarEvent } from 'src/types/calendar';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

// ----------------------------------------------------------------------

export default function useEvent(
  events: ICalendarEvent[],
  selectEventId: string,
  selectedRange: ICalendarRange,
  openForm: boolean
) {
  const currentEvent = events.find((event) => event.id === selectEventId);

  const defaultValues: ICalendarEvent = useMemo(
    () => ({
      id: '',
      reserveDate: '',
      start: selectedRange ? selectedRange.start : new Date().getTime(),
      end: selectedRange ? selectedRange.end : new Date().getTime(),
      color: CALENDAR_COLOR_OPTIONS[1],
      textColor: '', // ex
      title: '',
      status: false,
      spaceName: '',
      allDay: false,
      // invite: false, // ex
    }),
    [selectedRange]
  );

  if (!openForm) {
    return undefined;
  }

  if (currentEvent || selectedRange) {
    return merge({}, defaultValues, currentEvent);
  }

  return defaultValues;
}
