// react
import { useState } from "react";// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form';
import dayjs, { Dayjs } from 'dayjs';

// ———————————————————————————————————
export const defaultValues = {
  deptId: 0,
  name: '',
  headCount: 0,
  availableStart: '',
  availableEnd: '',
  detail: '',
  availability: true,
  // image: 'https://m.s1campus.co.kr:1543/comm/images/facility/b_lecture1.jpg',
  //
};
interface ReserveForm1Props {
  onNextClick: (data: any) => void;
}

export default function ReserveForm1({ onNextClick }: ReserveForm1Props) {
    const settings = useSettingsContext();
  
    const dialog = useBoolean();
  
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

    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [availableStart, setAvailableStart] = useState(defaultValues.availableStart);
    const [availableEnd, setAvailableEnd] = useState(defaultValues.availableEnd);
    const [personnele, setPersonnel] = useState('');
    const [space, setSpace] = useState<string>('');

    const handlePersonneleChange = (event: SelectChangeEvent) => {
      setPersonnel(event.target.value as string);
    };
    const handleSpaceChange = (event: SelectChangeEvent) => {
      setSpace(event.target.value as string);
    };
    const handleResetClick = () => {
      // 입력값을 초기화
      setDate(dayjs());
      setAvailableStart(defaultValues.availableStart);
      setAvailableEnd(defaultValues.availableEnd);
      setPersonnel('');
      setSpace('');
    };

    const handleNextClick = () => {
      // Assuming you have all the selected data in this object
      const selectedData = {
        date,
        availableStart,
        availableEnd,
        personnele,
        space,
      };
  
      onNextClick(selectedData);
    };

  return (
    <>
    <FormProvider methods={methods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="이용 가능 날짜"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <DesktopTimePicker
              label="예약 시작 시간"
              value={methods.watch('availableStart')}
              onChange={(newValue) => {
                if (newValue !== null) {
                  const dateObject = new Date(newValue);
                  const formattedTime = dateObject.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  // setValue('availableStart', formattedTime);
                  setAvailableStart(formattedTime);
                  console.log(formattedTime);
                }
              }}
            />
        <DesktopTimePicker
              label="예약 끝 시간"
              value={methods.watch('availableEnd')}
              onChange={(newValue) => {
                if (newValue !== null) {
                  const dateObject = new Date(newValue);
                  const formattedTime = dateObject.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  // setValue('availableEnd', formattedTime);
                  setAvailableEnd(formattedTime);
                  console.log(formattedTime);
                }
              }}
            />
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">수용 인원</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={personnele}
            label="Personnele"
            onChange={handlePersonneleChange}
          >
            <MenuItem value={10}>10명 이상</MenuItem>
            <MenuItem value={20}>20명 이상</MenuItem>
            <MenuItem value={30}>30명 이상</MenuItem>
          </Select>
        </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">이용 공간</InputLabel>
            <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={space}
             label="Space"
             onChange={handleSpaceChange}
           >
              <MenuItem value='장소 1'>장소 1</MenuItem>
              <MenuItem value='장소 2'>장소 2</MenuItem>
              <MenuItem value='장소 3'>장소 3</MenuItem>
            </Select>
            </FormControl>
        </Box>

        <Button onClick={handleNextClick} variant="outlined" color="inherit">
          다음
        </Button>
        <Button onClick={handleResetClick} variant="contained">
          초기화
        </Button>
        
      {/* 선택한 값들을 표시하는 부분 */}
      <div>
        <p>예약 날짜: {date ? date.format('YYYY-MM-DD') : '날짜가 선택되지 않았습니다.'}</p>
        <p>예약 시작 시간: {availableStart}</p>
        <p>예약 끝 시간: {availableEnd}</p>
        <p>선택한 수용 인원: {personnele}명 이상</p>
        <p>선택한 이용 공간: {space}</p>
      </div>
    </FormProvider>
    </>
  );
}