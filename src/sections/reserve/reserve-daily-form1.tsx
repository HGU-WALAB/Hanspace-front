// react
import { useState } from "react";
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
// hooks
// import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form';
import dayjs, { Dayjs } from 'dayjs';
// api
import { GetSpace } from 'src/api/spaceApi';
import { useQuery } from 'react-query';

const Text = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  margin: 0px;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 8px;
`;

// ———————————————————————————————————
export const defaultValues = {
  id: 1,
  reserveDate: '',
  startTime: '',
  endTime: '',
  headCount: 0,
  spaceId: 0,
};
interface ReserveForm1Props {
  onNextClick: (data: any) => void;
}

export default function ReserveDailyForm1({ onNextClick }: ReserveForm1Props) {
    // const settings = useSettingsContext();

    const { data: spaces } = useQuery(
      ['GetSpace', GetSpace],
      () => GetSpace().then((response) => response.data),
      {
        onSuccess: (data) => {
          console.log('GetSpace', data);
        },
      }
    );
  
    const methods = useForm({
      defaultValues
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
    const [startTime, setstartTime] = useState(defaultValues.startTime);
    const [endTime, setendTime] = useState(defaultValues.endTime);
    const [headCount, setheadCount] = useState('');
    const [spaceId, setSpaceId] = useState<string>('');

    const handlePersonneleChange = (event: SelectChangeEvent) => {
      setheadCount(event.target.value as string);
    };
    const handleSpaceChange = (event: SelectChangeEvent) => {
      setSpaceId(event.target.value as string);
    };

    const handleNextClick = () => {
      if (reserveDate && startTime && endTime && headCount && spaceId) {
        const selectedData = {
          reserveDate,
          startTime,
          endTime,
          headCount,
          spaceId,
        };

        onNextClick(selectedData);
      } else {
        // Handle the case where not all fields are filled, e.g., show an error message.
        alert('모든 필수 필드를 입력하세요.');
      }
    };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F2F1FA', borderRadius: '20px 0 0 0', paddingLeft: '20px'}}>
    <Typography variant="h4" style={{ padding: '20px 0 20px 0', color: '#5D5A88'}}> 
      Make a Reservation
    </Typography>
    <FormProvider methods={methods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Text>이용 날짜 *</Text>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              value={reserveDate}
              onChange={(newValue) => setDate(newValue)}
              sx={{ width: '280px'}}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Text>이용 시간 *</Text>
        <DesktopTimePicker
              label="예약 시작 시간"
              value={methods.watch('startTime')}
              onChange={(newValue) => {
                if (newValue !== null) {
                  const dateObject = new Date(newValue);
                  const formattedTime = dateObject.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  // setValue('availableStart', formattedTime);
                  setstartTime(formattedTime);
                  console.log(formattedTime);
                }
              }}
              sx={{ marginBottom: '20px', width: '280px'}}
            />
        <DesktopTimePicker
              label="예약 끝 시간"
              value={methods.watch('endTime')}
              onChange={(newValue) => {
                if (newValue !== null) {
                  const dateObject = new Date(newValue);
                  const formattedTime = dateObject.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  // setValue('availableEnd', formattedTime);
                  setendTime(formattedTime);
                  console.log(formattedTime);
                }
              }}
              sx={{ width: '280px'}}
            />
        <Box sx={{ minWidth: 120 }}>
        <Text>수용 인원 *</Text>
        <FormControl fullWidth>
          <InputLabel>수용 인원</InputLabel>
          <Select
            // labelId="demo-simple-select-label"
            // id="demo-simple-select"
            name="headCount"
            label="headCount"
            onChange={handlePersonneleChange}
            sx={{ width: '280px'}}
          >
            <MenuItem value={10}>10명 이상</MenuItem>
            <MenuItem value={20}>20명 이상</MenuItem>
            <MenuItem value={30}>30명 이상</MenuItem>
          </Select>
        </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
        <Text>이용 공간 *</Text>
        <FormControl fullWidth>
          <InputLabel>이용 공간</InputLabel>
            <Select
              name="spaceId"
              label="spaceId"
              onChange={handleSpaceChange}
              sx={{ width: '280px'}}
            > 
            {spaces && spaces.map((space: any) => (
              <MenuItem key={space?.spaceId} value={space?.spaceId}>
                {space?.name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>

        <Button onClick={handleNextClick} variant="outlined" color="inherit" disabled={isSubmitting} sx={{ marginTop: '30px', width: '175px'}}>
          다음
        </Button>
    </FormProvider>
    </Box>
  );
}