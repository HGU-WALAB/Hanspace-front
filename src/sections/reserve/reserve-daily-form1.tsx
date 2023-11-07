// react
import { useCallback, useEffect, useState } from "react";
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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
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
}

export default function ReserveDailyForm1({ handleDailyReserveInfo }: ReserveForm1Props) {
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
  
  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);
  
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
    const [halfTime, setHalfTime] = useState(0);

    const convertToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    const formatTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      console.log("hour+reamainingMinutes: ", hours+remainingMinutes);
      return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
    };

    const handleMinusClick = () => {
      let startMinutes;
      if(endTime === ''){
        startMinutes = convertToMinutes(startTime);
      }
      else{
        startMinutes = convertToMinutes(endTime);
      }
      const endMinutes = formatTime(startMinutes - 30);
      setendTime(endMinutes);
      setHalfTime(halfTime - 30);
      console.log("endtime: ", endTime);
      handleNextClick();
    };
  
    const handlePlusClick = () => {
      let startMinutes;
      if(endTime === ''){
        startMinutes = convertToMinutes(startTime);
      }
      else{
        startMinutes = convertToMinutes(endTime);
      }
      const endMinutes = formatTime(startMinutes + 30);
      setendTime(endMinutes);
      setHalfTime(halfTime + 30);
      console.log("endtime: ", endTime);
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
  
    
  return (
    <Box>
      <Typography variant="h6" color="primary" sx={{marginBottom: '20px'}}> 
        예약 가능한 공간 조회하기
      </Typography>
      <FormProvider methods={methods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ marginRight: '10px' }}>
            {/* <Typography variant="subtitle1" >이용 날짜 *</Typography> */}
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="예약 날짜"
                  value={reserveDate}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  sx={{ width: '200px'}}
                />
              </DemoContainer>
            </div>
          <div style={{ marginRight: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {/* <Typography variant="subtitle1">이용 시간 *</Typography> */}
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
                        setstartTime(formattedTime);
                        // console.log(formattedTime);
                      }
                    }}
                    sx={{ margin: '8.5px 10px 0 0', width: '200px'}}
                  />
              {/* <DesktopTimePicker
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
                        // console.log(formattedTime);
                      }
                    }}
                    sx={{ margin: '8.5px 10px 0 0', width: '200px'}}
                  /> */}
                  <Fab size="small" color="primary" aria-label="add" sx={{ml: 2, mr: 3}} onClick={handleMinusClick} disabled={halfTime<=0}>
                    <MinusIcon />
                  </Fab>
                  <Typography variant="subtitle1"> {halfTime} 분 추가</Typography>
                  <Fab size="small" color="primary" aria-label="minus" sx={{ml: 3}} onClick={handlePlusClick} disabled={halfTime >= 180}>
                    <AddIcon />
                  </Fab>
          </div>
          {/* <div style={{ flexGrow: 1 }}> */}
            {/* <Typography variant="subtitle1">사용 인원 *</Typography> */}
            {/* <RHFTextField 
              name="headCount" 
              label="사용 인원을 입력해주세요." 
              sx={{ margin: '8.5px 10px 0 0', width: '200px'}} 
              type="number"
              onChange={(newValue) => {
                const numericValue = parseFloat(newValue.target.value);
                setheadCount(numericValue);
              }}
              value={headCount}
            /> */}
            {/* <FormControl fullWidth>
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
            </FormControl> */}
            {/* <Text>이용 공간 *</Text>
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
              </FormControl> */}
          {/* </div> */}
          {/* <div style={{ flexGrow: 1 }}>
            <Button onClick={handleNextClick} variant="contained" color="primary" disabled={isSubmitting} sx={{ marginTop: '40px' }}>
              장소 찾기
            </Button>
          </div> */}
        </div>
        </LocalizationProvider>
      </FormProvider>
    </Box>
  );
}