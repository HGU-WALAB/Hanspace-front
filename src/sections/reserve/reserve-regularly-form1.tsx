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
    margin-top: 10px;
`;
const DayButton = styled.button`
    width: 31px;
    height: 42px;
    border-radius: 7px;
    margin-right: 7px;
    border-color: #C0C0C0;
    border-width: 2px;
`;

// ———————————————————————————————————
export const defaultValues = {
  id: 1,
  startDate: '',
  endDate: '',
  week: '',
  startTime: '',
  endTime: '',
  headCount: 0,
  spaceId: 0,
};
interface ReserveForm1Props {
  onNextClick: (data: any) => void;
}

export default function ReserveRegularyForm1({ onNextClick }: ReserveForm1Props) {
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

    const [startDate, setstartDate] = useState<Dayjs | null>(dayjs());
    const [endDate, setendDate] = useState<Dayjs | null>(dayjs());
    const [week, setweek] = useState<string[]>([]);
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
      if (startDate && endDate && week && headCount && spaceId) {
        const selectedData = {
            startDate,
            endDate,
            week,
            startTime,
            endTime,
            headCount,
            spaceId,
        };
        onNextClick(selectedData);
      } else {
        alert('모든 필수 필드를 입력하세요.');
      }
    };

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
        <Box sx={{ minHeight: '100vh', backgroundColor: '#F2F1FA', borderRadius: '20px 0 0 0', paddingLeft: '20px'}}>
        <Typography variant="h5" style={{ padding: '20px 0 20px 0', color: '#5D5A88'}}> 
        Make a Regulary Reservation
        </Typography>
        <FormProvider methods={methods}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text>시작 일 *</Text>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                    value={startDate}
                    onChange={(newValue) => setstartDate(newValue)}
                    sx={{ width: '240px', marginLeft: '10px'}}
                    />
                </DemoContainer>
            </div>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text>종료 일 *</Text>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                    value={endDate}
                    onChange={(newValue) => setendDate(newValue)}
                    sx={{ width: '240px', marginLeft: '10px' }}
                    />
                </DemoContainer>
            </div>
            </LocalizationProvider>
            <Text>요일 *</Text>
            {days.map((day) => (
                <DayButton
                key={day}
                onClick={() => toggleDay(day)}
                style={{
                    background: week.includes(day) ? '#8F8CC2' : 'transparent',
                }}
                type="button"
                >
                {day}
                </DayButton>
            ))}
            <DayButton type="button" onClick={toggleAllDays} style={{ width: '40px' }}>
                전체
            </DayButton>
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
                sx={{ marginTop: '10px', marginBottom: '10px', width: '280px'}}
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
                sx={{ width: '280px' }}
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