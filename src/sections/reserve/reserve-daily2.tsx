// react
import { useEffect, useState } from "react";
import styled from 'styled-components';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
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
interface ReserveDailyForm2Props {
  selectedData: {
    reserveDate: Date;
    startTime: string;
    endTime: string;
    headCount: number; // 예상되는 데이터 타입에 따라 수정
    spaceId: number; // 예상되는 데이터 타입에 따라 수정
    spaceName: string;
  };
}

interface InputField {
  value: string;
}

export default function ReserveDaily2({ selectedData }: ReserveDailyForm2Props) {  
  return (
    <Box>
        <Typography variant="h4" color="primary" sx={{marginBottom: '20px'}}> 
            예약 선택 정보
        </Typography>
        <Typography variant="subtitle1">{selectedData.reserveDate.toISOString().split('T')[0]}</Typography>
        <Typography variant="subtitle1">{selectedData.startTime}</Typography>
        <Typography variant="subtitle1">{selectedData.endTime}</Typography>
        <Typography variant="subtitle1">{selectedData.spaceId}</Typography>
        <Typography variant="subtitle1">{selectedData.spaceName}</Typography>
        <Typography variant="subtitle1">{selectedData.headCount}</Typography>
    </Box>
  );
}