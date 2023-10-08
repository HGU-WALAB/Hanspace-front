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
import FormProvider from 'src/components/hook-form';

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

export default function ReserveForm2() {
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

  return (
    <>
    <FormProvider methods={methods}>


        <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
          이전
        </Button>
        <Button variant="contained">
          예약하기
        </Button>
    </FormProvider>
    </>
  );
}