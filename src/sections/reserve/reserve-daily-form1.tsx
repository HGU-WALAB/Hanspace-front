// react
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
// hooks
// import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import FormProvider from 'src/components/hook-form';
// api
import { GetSpace } from 'src/api/spaceApi';
import { useQuery } from 'react-query';
import { TextField, TextFieldProps } from '@mui/material';
import RowRadioButtonsGroup from './reserve-radio';

// ———————————————————————————————————
export const defaultValues = {
  id: 1,
  reserveDate: '',
  startTime: '',
  endTime: '',
  // headCount: 0,
  // spaceId: 0,
};
interface ReserveForm1Props {
  handleDailyReserveInfo: (data: any) => void;
  selectedValue: string;
  handleRadioChange: (data: string) => void;
}

export default function ReserveDailyForm1({ handleDailyReserveInfo, selectedValue, handleRadioChange }: ReserveForm1Props) {
  // const settings = useSettingsContext();

  // const { data: spaces } = useQuery(
  //   ['GetSpace', GetSpace],
  //   () => GetSpace().then((response) => response.data),
  //   {
  //     onSuccess: (data) => {
  //       console.log('GetSpace', data);
  //     },
  //   }
  // );

  const methods = useForm({
    defaultValues,
  });

  const {
    // watch,
    // reset,
    // control,
    setValue,
    // handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [reserveDate, setDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState(defaultValues.endTime);
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
    const selectedData = {
      reserveDate,
      startTime,
      endTime,
      // headCount,
      // spaceId: spaceIdNumber,
    };
    handleDailyReserveInfo(selectedData);
  }, [reserveDate, startTime, endTime, handleDailyReserveInfo]);

  useEffect(() => {
    handleNextClick();
  }, [handleNextClick]);

  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);
  const defaultDayjs = dayjs(defaultDate).hour(0).minute(0).second(0).millisecond(0);

  return (
    <Box>
      <Typography variant="h6" color="primary" sx={{ mb: 5 }}>
        예약 가능한 공간 조회하기
      </Typography>
      <FormProvider methods={methods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="예약 날짜"
                  value={reserveDate}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  sx={{ width: '200px', mr: 3 }}
                />
              </DemoContainer>
              <DesktopTimePicker
                label="예약 시작 시간"
                value={methods.watch('startTime') || defaultDayjs}
                onChange={(newValue) => {
                  if (newValue !== null) {
                    const dateObject =
                      typeof newValue === 'string' ? new Date(newValue) : newValue.toDate();
                    const formattedTime = dateObject.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    });
                    setstartTime(formattedTime);
                  }
                }}
                sx={{ margin: '8.5px 10px 0 0', width: '200px' }}
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
            <RowRadioButtonsGroup selectedValue={selectedValue} onValueChange={handleRadioChange}/>
          </div>
        </LocalizationProvider>
      </FormProvider>
    </Box>
  );
}
