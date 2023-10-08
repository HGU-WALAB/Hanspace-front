// react
import * as React from 'react';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
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
interface ReserveForm2Props {
  onPrevClick: () => void; // Specify the type of onNextClick as a function with no arguments
}

export default function ReserveForm2({ onPrevClick }: ReserveForm2Props) {
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

    const handlePrevClick = () => {
      // 다음 페이지로 이동
      onPrevClick();
    };

  return (
    <>
    <FormProvider methods={methods}>
      <p>장소</p>
      <p>예약 날짜</p>
      <p>신청인</p>
      <p>시작 시간</p>
      <p>끝 시간</p>
      <RHFTextField name="name" label="모임명" />
      <RHFTextField name="name" label="목적" />
      <RHFTextField name="name" label="연락처" />

        <Button onClick={handlePrevClick} variant="outlined" color="inherit">
          이전
        </Button>
        <Button variant="contained">
          예약하기
        </Button>
    </FormProvider>
    </>
  );
}