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
import CalendarForm from '../calendar-form';
import CalendarToolbar from '../calendar-toolbar';
import CalendarFilters from '../calendar-filters';
import CalendarFiltersResult from '../calendar-filters-result';

// ----------------------------------------------------------------------

const defaultFilters: ICalendarFilters = {
  colors: [],
  startDate: null,
  endDate: null,
};

const eventsData = [
  {
    id: "1",
    allDay: false,
    color: "#00A76F",
    description: "공프기 마감 작업 회의 진행 예정",
    start: new Date('2023.11.23 11:00:00').getTime(),
    end: new Date('2023.11.23 14:30:00').getTime(),
    textColor: "#00A76F",
    title: "공프기 회의",
  },
  {
    id: "2",
    allDay: false,
    color: "#00B8D9",
    description: "학합 연습 진행 예정, 인원은 25명 예상",
    start: new Date('2023.11.01 19:00:00').getTime(),
    end: new Date('2023.11.04 22:00:00').getTime(),
    textColor: "#00B8D9",
    title: "학합 연습",
  },
  {
    id: "3",
    allDay: false,
    color: "#003768",
    description: "비즈플로우 대표님과 식사자리 마련",
    start: new Date('2023.11.11 11:00:00').getTime(),
    end: new Date('2023.11.11 20:30:00').getTime(),
    textColor: "#003768",
    title: "비즈플로우",
  },
  {
    id: "4",
    allDay: false,
    color: "#FFAB00",
    description: "실전프로젝트1 특별 수업 진행",
    start: new Date('2023.11.18 11:00:00').getTime(),
    end: new Date('2023.11.20 13:30:00').getTime(),
    textColor: "#FFAB00",
    title: "실전프로젝트 수업",
  },
  // 또 다른 이벤트를 추가하려면 위와 같은 구조로 객체를 계속 추가합니다.
];

// ----------------------------------------------------------------------

export default function AdminCalendarView() {
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
    onSelectRange,
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
            <CalendarToolbar
              date={date}
              view={view}
              loading={eventsLoading}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onToday={onDateToday}
              onChangeView={onChangeView}
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
              select={onSelectRange}
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
          {openForm && <> {currentEvent?.id ? '일정 수정하기' : '일정 추가하기'}</>}
        </DialogTitle>

        <CalendarForm
          currentEvent={currentEvent}
          colorOptions={CALENDAR_COLOR_OPTIONS}
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
