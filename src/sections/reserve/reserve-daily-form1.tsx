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
// hooks
// import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import FormProvider , {
  RHFEditor,
  RHFSelect,
  RHFUpload,
  RHFSwitch,
  RHFSlider,
  RHFCheckbox,
  RHFTextField,
  RHFRadioGroup,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';
// api
import { GetSpace } from 'src/api/spaceApi';
import { useQuery } from 'react-query';


// ———————————————————————————————————
export const defaultValues = {
  id: 1,
  reserveDate: '',
  startTime: '',
  endTime: '',
  headCount: 0,
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
    const [headCount, setheadCount] = useState(defaultValues.headCount);
    // const [spaceId, setSpaceId] = useState('');

    // const handleHeadCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const numericValue = event.target.value.replace(/\D/g, ''); // 숫자만
    //   setheadCount(numericValue);
    //   console.log(numericValue);
    //   handleNextClick();
    // };
    // const handleSpaceChange = (event: SelectChangeEvent) => {
    //   const value = event.target.value;
    //   setSpaceId(value);
    // };

    const handleNextClick = useCallback(() => {
      const selectedData = {
        reserveDate,
        startTime,
        endTime,
        headCount,
        // spaceId: spaceIdNumber,
      };
      handleDailyReserveInfo(selectedData);
  }, [reserveDate, startTime, endTime, headCount, handleDailyReserveInfo]);
  
  useEffect(() => {
    handleNextClick();
  }, [handleNextClick]);
  
    
  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{marginBottom: '20px'}}> 
        일일 예약 하기
      </Typography>
      <FormProvider methods={methods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ marginRight: '10px' }}>
            {/* <Typography variant="subtitle1" >이용 날짜 *</Typography> */}
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  value={reserveDate}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  sx={{ width: '200px'}}
                />
              </DemoContainer>
            </div>
          <div style={{ marginRight: '10px' }}>
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
                        // console.log(formattedTime);
                      }
                    }}
                    sx={{ margin: '8.5px 10px 0 0', width: '200px'}}
                  />
          </div>
          {/* <div style={{ flexGrow: 1 }}> */}
            {/* <Typography variant="subtitle1">사용 인원 *</Typography> */}
            <RHFTextField 
              name="headCount" 
              label="사용 인원을 입력해주세요." 
              sx={{ margin: '8.5px 10px 0 0', width: '200px'}} 
              type="number"
              onChange={(newValue) => {
                const numericValue = parseFloat(newValue.target.value);
                setheadCount(numericValue);
              }}
              value={headCount}
            />
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