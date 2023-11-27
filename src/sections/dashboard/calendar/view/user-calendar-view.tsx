import Calendar from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
//
import { useState, useEffect, useCallback } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
// utils
import { fTimestamp } from 'src/utils/format-time';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';
import { palette as themePalette } from 'src/theme/palette';
// api
import { useGetEvents, updateEvent } from 'src/api/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
// types
import { ICalendarFilters, ICalendarFilterValue, ICalendarEvent } from 'src/types/calendar';
//
import { useCalendar, useEvent } from '../hooks';
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
const palette = themePalette('light');
const eventsData: ICalendarEvent[] = [ // ex
  {
    id: "1",
    allDay: false,
    color: palette.secondary.main,
    description: "공프기 마감 작업 회의 진행 예정",
    start: new Date('2023.11.23 11:00:00').getTime(),
    end: new Date('2023.11.23 14:30:00').getTime(),
    textColor: palette.secondary.main,
    title: "뉴턴 210호",
    invite: true,
  },
  {
    id: "2",
    allDay: false,
    color: palette.secondary.main,
    description: "학합 연습 진행 예정, 인원은 25명 예상",
    start: new Date('2023.11.04 19:00:00').getTime(),
    end: new Date('2023.11.04 22:00:00').getTime(),
    textColor: palette.secondary.main,
    title: "뉴턴 210호",
    invite: true,
  },
  {
    id: "3",
    allDay: false,
    color: palette.info.main,
    description: "비즈플로우 대표님과 식사자리 마련",
    start: new Date('2023.11.12 20:00:00').getTime(),
    end: new Date('2023.11.12 21:30:00').getTime(),
    textColor: palette.info.main,
    title: "뉴턴 220호",
    invite: false,
  },
  {
    id: "4",
    allDay: false,
    color: palette.success.main,
    description: "실전프로젝트1 특별 수업 진행",
    start: new Date('2023.11.20 22:00:00').getTime(),
    end: new Date('2023.11.20 23:30:00').getTime(),
    textColor: palette.success.main,
    title: "뉴턴 319호",
    invite: false,
  },
  {
    id: "5",
    allDay: false,
    color: palette.error.main,
    description: "실전프로젝트1 특별 수업 진행",
    start: new Date('2023.11.26 19:00:00').getTime(),
    end: new Date('2023.11.26 20:30:00').getTime(),
    textColor: palette.error.main,
    title: "뉴턴 113호",
    invite: false,
  },
  {
    id: "6",
    allDay: false,
    color: palette.secondary.main,
    description: "실전프로젝트1 특별 수업 진행",
    start: new Date('2023.11.07 21:00:00').getTime(),
    end: new Date('2023.11.07 22:30:00').getTime(),
    textColor: palette.secondary.main,
    title: "뉴턴 210호",
    invite: true,
  },
  {
    id: "7",
    allDay: false,
    color: palette.success.main,
    description: "실전프로젝트1 특별 수업 진행",
    start: new Date('2023.11.09 20:00:00').getTime(),
    end: new Date('2023.11.09 21:30:00').getTime(),
    textColor: palette.success.main,
    title: "뉴턴 319호",
    invite: true,
  },
  {
    id: "8",
    allDay: false,
    color: palette.error.main,
    description: "캡스톤 디자인 회의",
    start: new Date('2023.11.27 21:00:00').getTime(),
    end: new Date('2023.11.27 22:30:00').getTime(),
    textColor: palette.error.main,
    title: "뉴턴 113호",
    invite: true,
  },
  {
    id: "9",
    allDay: false,
    color: palette.success.main,
    description: "공프기 회의",
    start: new Date('2023.11.27 15:00:00').getTime(),
    end: new Date('2023.11.27 16:30:00').getTime(),
    textColor: palette.success.main,
    title: "뉴턴 319호",
    invite: true,
  },
  {
    id: "10",
    allDay: false,
    color: palette.error.main,
    description: "멋사 회의",
    start: new Date('2023.11.27 09:00:00').getTime(),
    end: new Date('2023.11.27 10:30:00').getTime(),
    textColor: palette.error.main,
    title: "뉴턴 113호",
    invite: true,
  },
  {
    id: "11",
    allDay: false,
    color: palette.secondary.main,
    description: "실프 TA 세션",
    start: new Date('2023.11.27 18:00:00').getTime(),
    end: new Date('2023.11.27 19:00:00').getTime(),
    textColor: palette.secondary.main,
    title: "뉴턴 210호",
    invite: true,
  },
  {
    id: "12",
    allDay: false,
    color: palette.info.main,
    description: "HanSpace 고정 회의",
    start: new Date('2023.11.28 11:00:00').getTime(),
    end: new Date('2023.11.28 12:30:00').getTime(),
    textColor: palette.info.main,
    title: "뉴턴 220호",
    invite: false,
  },
];

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
  
  // eventsData를 사용하여 이벤트 목록을 만들 수 있습니다.
  const events = eventsData;
  const eventsLoading = false;

  console.log('events: ', events);

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
    onOpenForm,
    onCloseForm,
    //
    selectEventId,
    selectedRange,
    //
    onClickEventInFilters,
  } = useCalendar();

  const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);

  useEffect(() => {
    onInitialView();
  }, [onInitialView]);

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
        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Typography variant="h4">Calendar</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onOpenForm}
          >
            New Event
          </Button>
        </Stack> */}

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
          {openForm && <> {currentEvent?.id ? '일정 확인하기' : '일정 추가하기'}</>}
        </DialogTitle>

        <CalendarUForm
          currentEvent={currentEvent}
          // colorOptions={CALENDAR_COLOR_OPTIONS}
          onClose={onCloseForm}
        />
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
