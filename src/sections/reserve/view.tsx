import { yupResolver } from '@hookform/resolvers/yup';
// react
import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { CalendarView } from 'src/sections/calendar/view';
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import { DesktopTimePicker } from '@mui/x-date-pickers';

import { FormSchema } from './schema';

import DatePickerValue from './date-picker';
import DropDownSelect from './dropdown-picker';

// ———————————————————————————————————
export const defaultValues = {
  fullName: '', // 추가: Full Name 필드의 기본값
  email: '', // 추가: Email 필드의 기본값
  age: 18, // 추가: Age 필드의 기본값 (예: 18세)
  startDate: null, // 추가: Start Date 필드의 기본값
  endDate: null, // 추가: End Date 필드의 기본값
  password: '', // 추가: Password 필드의 기본값
  confirmPassword: '', // 추가: Confirm Password 필드의 기본값
  slider: 10, // 추가: Slider 필드의 기본값 (예: 10)
  sliderRange: [20, 80], // 추가: Slider Range 필드의 기본값 (예: [20, 80])
  singleUpload: null, // 추가: Single Upload 필드의 기본값
  multiUpload: [], // 추가: Multi Upload 필드의 기본값
  checkbox: false, // 추가: Checkbox 필드의 기본값 (예: false)
  multiCheckbox: [], // 추가: Multi Checkbox 필드의 기본값
  singleSelect: '', // 추가: Single Select 필드의 기본값
  multiSelect: [], // 추가: Multi Select 필드의 기본값
  switch: false, // 추가: Switch 필드의 기본값 (예: false)
  radioGroup: '', // 추가: Radio Group 필드의 기본값
  editor: '', // 추가: Editor 필드의 기본값
  autocomplete: null, // 추가: Autocomplete 필드의 기본값
  deptId: 0, // deptId 필드의 기본값 유지
  name: '', // name 필드의 기본값 유지
  headCount: 0, // headCount 필드의 기본값 유지
  availableStart: '', // availableStart 필드의 기본값 유지
  availableEnd: '', // availableEnd 필드의 기본값 유지
  detail: '', // detail 필드의 기본값 유지
  availability: true, // availability 필드의 기본값 유지
  // image: 'https://m.s1campus.co.kr:1543/comm/images/facility/b_lecture1.jpg', // 필요하다면 image 필드도 유지
};


export default function ReserveView() {
  const settings = useSettingsContext();
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const dialog = useBoolean();

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues
  });

  const {
    // watch,
    // reset,
    // control,
    setValue,
    // handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  return (
    <>
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" style={{ marginBottom: '30px' }}> 
          Page Reserve 
          <Button onClick={toggleCalendar} variant="outlined"> Calendar</Button>
      </Typography>
      
      {showCalendar && <CalendarView />}
      {/* <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      /> */}
<FormProvider methods={methods}>
  <DatePickerValue />
  <DropDownSelect />

            {/* <RHFTextField name="detail" label="detail" />

            <RHFSwitch name="availability" label="availability" /> */}

          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            다음
          </Button>
          <Button variant="contained">
            초기화
          </Button>
    </FormProvider>
    </Container>
     </>
  );
}

// ———————————————————————————————————

// interface BlockProps extends StackProps {
//   label?: string;
//   children: React.ReactNode;
// }

// function Block({ label = 'RHFTextField', sx, children }: BlockProps) {
//   return (
//     <Stack spacing={1} sx={{ width: 1, …sx }}>
//       <Typography
//         variant="caption"
//         sx={{
//           textAlign: 'right',
//           fontStyle: 'italic',
//           color: 'text.disabled',
//         }}
//       >
//         {label}
//       </Typography>
//       {children}
//     </Stack>
//   );
// }
