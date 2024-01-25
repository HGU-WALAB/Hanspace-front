// react
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
// @mui
import Box from '@mui/material/Box';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
// hooks
// import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form';
import dayjs, { Dayjs } from 'dayjs';
import RowRadioButtonsGroup from './reserve-radio';

const DayButton = styled.button`
  width: 31px;
  height: 42px;
  border-radius: 7px;
  margin-right: 7px;
  border-width: 2px;
  background: white;
`;

// ———————————————————————————————————
export const defaultValues = {
  id: 1,
  startDate: '',
  endDate: '',
  week: '',
  startTime: '',
  endTime: '',
  // headCount: 0,
  // spaceId: 0,
};
interface ReserveForm1Props {
  handleRegularlyReserveInfo: (data: any) => void;
  selectedValue: string;
  handleRadioChange: (data: string) => void;
}

export default function ReserveRegularyForm1({
  handleRegularlyReserveInfo,
  selectedValue,
  handleRadioChange,
}: ReserveForm1Props) {
  const methods = useForm({
    defaultValues,
  });

  // const {
  //   // watch,
  //   // reset,
  //   // control,
  //   // setValue,
  //   // handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  const [startDate, setstartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setendDate] = useState<Dayjs | null>(dayjs());
  const [week, setweek] = useState<string[]>([]);
  const [startTime, setstartTime] = useState(defaultValues.startTime);
  const [endTime, setendTime] = useState(defaultValues.endTime);

  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);
  const [halfTime, setHalfTime] = useState(0);

  const convertToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    console.log('hour+reamainingMinutes: ', hours + remainingMinutes);
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
  };

  const handleMinusClick = () => {
    let startMinutes;
    if (endTime === '') {
      startMinutes = convertToMinutes(startTime);
    } else {
      startMinutes = convertToMinutes(endTime);
    }
    const endMinutes = formatTime(startMinutes - 30);
    setendTime(endMinutes);
    setHalfTime(halfTime - 30);
    console.log('endtime: ', endTime);
    handleNextClick();
  };

  const handlePlusClick = () => {
    let startMinutes;
    if (endTime === '') {
      startMinutes = convertToMinutes(startTime);
    } else {
      startMinutes = convertToMinutes(endTime);
    }
    const endMinutes = formatTime(startMinutes + 30);
    setendTime(endMinutes);
    setHalfTime(halfTime + 30);
    console.log('endtime: ', endTime);
    handleNextClick();
  };

  const handleNextClick = useCallback(() => {
    // const headCountNumber = parseInt(headCount, 10);
    // const spaceIdNumber = parseInt(spaceId, 10);
    const selectedData = {
      startDate,
      endDate,
      week,
      startTime,
      endTime,
      // headCount,
      // spaceId: spaceIdNumber,
    };
    handleRegularlyReserveInfo(selectedData);
  }, [startDate, endDate, week, startTime, endTime, handleRegularlyReserveInfo]);

  useEffect(() => {
    handleNextClick();
  }, [handleNextClick]);

  const days: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const toggleDay = (day: string) => {
    if (week.includes(day)) {
      // 이미 선택된 경우, 선택 해제
      setweek(week.filter((d) => d !== day));
    } else {
      // 선택되지 않은 경우, 선택
      setweek([...week, day]);
    }
  };

  const toggleAllDays = () => {
    if (week.length === days.length) {
      // 모든 날짜가 선택된 경우, 모두 선택 해제
      setweek([]);
    } else {
      // 일부 또는 전혀 선택되지 않은 경우, 모두 선택
      setweek([...days]);
    }
  };

  return (
    <Box>
      <Typography variant="h6" color="primary" sx={{ mb: 5 }}>
        예약 가능한 공간 조회하기
      </Typography>
      <FormProvider methods={methods}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => {
                    setstartDate(newValue);
                  }}
                  sx={{ width: '160px', mr: 1 }}
                  label="시작 일"
                />
              </DemoContainer>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => {
                    setendDate(newValue);
                  }}
                  sx={{ width: '160px', mr: 1 }}
                  label="종료 일"
                />
              </DemoContainer>
            </LocalizationProvider>
            <DayButton type="button" onClick={toggleAllDays} style={{ width: '40px' }}>
              전체
            </DayButton>
            {days.map((day) => (
              <DayButton
                key={day}
                onClick={() => {
                  toggleDay(day);
                }}
                style={{
                  background: week.includes(day) ? '#CECECE' : 'white',
                }}
                type="button"
              >
                {day}
              </DayButton>
            ))}
            <DesktopTimePicker
              label="예약 시작 시간"
              value={methods.watch('startTime') || defaultDate}
              onChange={(newValue) => {
                if (newValue !== null) {
                  const dateObject = new Date(newValue);
                  const formattedTime = dateObject.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  setstartTime(formattedTime);
                }
              }}
              sx={{ margin: '8.5px 5px 0 0', width: '160px' }}
            />
            <Fab
              size="small"
              color="primary"
              aria-label="minus"
              sx={{ ml: 2, mr: 3 }}
              onClick={handleMinusClick}
              disabled={halfTime <= 0}
            >
              <MinusIcon />
            </Fab>
            <Typography variant="subtitle1">{halfTime} 분 사용</Typography>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              sx={{ ml: 3 }}
              onClick={handlePlusClick}
              disabled={halfTime >= 180 || startTime === ''}
            >
              <AddIcon />
            </Fab>
          </div>
          <RowRadioButtonsGroup selectedValue={selectedValue} onValueChange={handleRadioChange} />
        </div>
      </FormProvider>
    </Box>
  );
}
