import Calendar from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
//
import { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { userDeptState } from 'src/utils/atom';
// @mui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import DialogTitle from '@mui/material/DialogTitle';
// utils
import { fTimestamp } from 'src/utils/format-time';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';
// api
import { updateEvent } from 'src/api/calendar';
import { GetReserveListByDept } from 'src/api/reserveApi';
// components
import { useSettingsContext } from 'src/components/settings';
// types
import { ICalendarFilters, ICalendarFilterValue, ICalendarEvent } from 'src/types/calendar';
//
import { useAdminCalendar } from '../hooks';
import { StyledCalendar } from '../styles';
import CalendarUForm from '../calendar-uform';
import UCalendarToolbar from '../calendar-utoolbar';
import CalendarFilters from '../calendar-filters';
import CalendarFiltersResult from '../calendar-filters-result';

// interface UserCalendarEvent {
//   id: string;
//   allDay: boolean;
//   color: string;
//   description: string;
//   start: ICalendarDate;
//   end: ICalendarDate;
//   textColor: string;
//   title: string;
//   invite: boolean; // 초대받은 일정인지
// } // ex
// ----------------------------------------------------------------------

const defaultFilters: ICalendarFilters = {
  colors: [],
  startDate: null,
  endDate: null,
};
// const eventsData: ICalendarEvent[] = [ // ex
//   {
//     id: "1",
//     allDay: false,
//     color: palette.secondary.main,
//     description: "공프기 마감 작업 회의 진행 예정",
//     start: new Date('2023.11.23 11:00:00').getTime(),
//     end: new Date('2023.11.23 14:30:00').getTime(),
//     textColor: palette.secondary.main,
//     title: "뉴턴 210호",
//     invite: true,
//   },

// ----------------------------------------------------------------------

export default function UserCalendarView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const smUp = useResponsive('up', 'sm');

  const openFilters = useBoolean();

  console.log('openFilters', openFilters);

  const [filters, setFilters] = useState(defaultFilters);

  console.log('filters', filters);

  // const { events, eventsLoading } = useGetEvents();

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    // onSelectRange,
    onClickEvent,
    onResizeEvent,
    onInitialView,
    //
    openForm,
    // onOpenForm,
    onCloseForm,
    //
    selectEventId,
    // selectedRange,
    //
    onClickEventInFilters,
  } = useAdminCalendar();

  const [eventsData, setEventData] = useState<ICalendarEvent[] | null>();

  const userDeptInfo = useRecoilValue(userDeptState);
  let deptId = '';
  if (typeof userDeptInfo === 'object') {
    deptId = `${userDeptInfo.deptId}`;
  }

  useEffect(() => {
    onInitialView();
    // ToDo : ReserveBySpaceId List API
    const fetchData = async () => {
      try {
        const data = await GetReserveListByDept(Number(deptId));
        setEventData(data);
        console.log('data', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onInitialView, deptId]);

  // eventsData를 사용하여 이벤트 목록을 만들 수 있습니다.
  const events = eventsData || [];
  const eventsLoading = false;

  // const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);

  const handleFilters = useCallback((name: string, value: ICalendarFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const canReset = !!filters.colors.length || (!!filters.startDate && !!filters.endDate);

  const dataFiltered = applyFilter({
    inputData: events,
    filters,
    dateError,
  });

  const renderResults = (
    <CalendarFiltersResult
      filters={filters}
      onFilters={handleFilters}
      //
      canReset={canReset}
      onResetFilters={handleResetFilters}
      //
      results={dataFiltered.length}
      sx={{ mb: { xs: 3, md: 5 } }}
    />
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        {canReset && renderResults}

        <Card>
          <StyledCalendar>
            <UCalendarToolbar
              date={date}
              view={view}
              loading={eventsLoading}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onToday={onDateToday}
              onUChangeView={onChangeView}
              onOpenFilters={openFilters.onTrue}
            />

            <Calendar
              weekends
              editable
              droppable
              selectable
              rerenderDelay={10}
              allDayMaintainDuration
              eventResizableFromStart
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              events={dataFiltered}
              headerToolbar={false}
              // select={onSelectRange}
              eventClick={onClickEvent}
              height={smUp ? 720 : 'auto'}
              eventDrop={(arg) => {
                onDropEvent(arg, updateEvent);
              }}
              eventResize={(arg) => {
                onResizeEvent(arg, updateEvent);
              }}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </StyledCalendar>
        </Card>
      </Container>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={openForm}
        onClose={onCloseForm}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
      >
        <DialogTitle sx={{ minHeight: 76 }}>
          {/* {openForm && <> {selectEventId ? '일정 확인하기' : '일정 추가하기'}</>} */}
          {openForm && { selectEventId } && '일정 확인하기'}
        </DialogTitle>
        {
          selectEventId && (
            <CalendarUForm
              currentEvent={events.find((event) => event.id.toString() === selectEventId)}
              onClose={onCloseForm}
            />
          )
          //   :
          //   <CalendarForm
          //     currentEvent={currentEvent}
          //     onClose={onCloseForm}
          // />
        }
      </Dialog>

      <CalendarFilters
        open={openFilters.value}
        onClose={openFilters.onFalse}
        //
        filters={filters}
        onFilters={handleFilters}
        //
        canReset={canReset}
        onResetFilters={handleResetFilters}
        //
        dateError={dateError}
        //
        events={events}
        colorOptions={CALENDAR_COLOR_OPTIONS}
        onClickEvent={onClickEventInFilters}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filters,
  dateError,
}: {
  inputData: ICalendarEvent[];
  filters: ICalendarFilters;
  dateError: boolean;
}) {
  const { colors, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  inputData = stabilizedThis.map((el) => el[0]);

  if (colors.length) {
    inputData = inputData.filter((event) => colors.includes(event.color as string));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (event) =>
          fTimestamp(event.start) >= fTimestamp(startDate) &&
          fTimestamp(event.end) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
