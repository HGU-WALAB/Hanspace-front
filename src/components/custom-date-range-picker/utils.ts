import { isSameDay, isSameMonth, getYear } from 'date-fns';
// utils
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function shortDateLabel(startDate: Date | null, endDate: Date | null) {
  const getCurrentYear = new Date().getFullYear();

  const startDateYear = startDate ? getYear(startDate) : null;

  const endDateYear = endDate ? getYear(endDate) : null;

  const currentYear = getCurrentYear === startDateYear && getCurrentYear === endDateYear;

  const sameDay = startDate && endDate ? isSameDay(new Date(startDate), new Date(endDate)) : false;

  const sameMonth =
    startDate && endDate ? isSameMonth(new Date(startDate), new Date(endDate)) : false;

  if (currentYear) {
    if (sameMonth) {
      if (sameDay) {
        return fDate(endDate, 'yy/MM/dd');
      }
      return `${fDate(startDate, 'yy/MM/dd')} - ${fDate(endDate, 'dd')}`;
    }
    return `${fDate(startDate, 'yy/MM/dd')} - ${fDate(endDate, 'MM/dd')}`;
  }

  return `${fDate(startDate, 'yy/MM/dd')} - ${fDate(endDate, 'yy/MM/dd')}`;
}
