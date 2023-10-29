// react
import { useEffect, useState } from "react";
import styled from 'styled-components';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form';

// ———————————————————————————————————

export default function ReserveCSVForm() {  
  const defaultValues = {
    // spaceId: 1,
    // memberId: 1,
    // regularReserveId: null,
    // reserveDate: selectedData.reserveDate,
    // startTime: selectedData.startTime,
    // endTime: selectedData.endTime,
    // headCount: selectedData.headCount,
    // groupName: '',
    // purpose: '',
    // phoneNumber: '',
    // approve: '미승인',
    // extraInfoAns: [ ],
    // image: 'https://m.s1campus.co.kr:1543/comm/images/facility/b_lecture1.jpg',
  };
    const methods = useForm({
      defaultValues
    });
  
    const {
      // watch,
      reset,
      // control,
      setValue,
      handleSubmit,
      formState: { isSubmitting },
    } = methods;

  return (
    <Box>
    <Typography variant="h4" color="primary" sx={{marginBottom: '20px'}}> 
      CSV 파일로 예약하기
    </Typography>
    <FormProvider methods={methods}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button variant="outlined" color="inherit" sx={{ width: '300px', height: '55px', marginBottom: '16px'}}>
        업로드 양식 다운로드하기
      </Button>
      <Button variant="outlined" color="inherit" sx={{ width: '300px', height: '55px', marginBottom: '40px', borderRadius: '50px'}}>
        파일 선택
      </Button>
      <Button variant="outlined" color="primary" sx={{ width: '300px', height: '55px', borderRadius: '50px'}}>
        확인
      </Button>
    </div>
    </FormProvider>
    </Box>
  );
}