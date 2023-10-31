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
        <Typography variant="h4" color="primary" sx={{mb: 10}}> 
          예약 선택 정보
        </Typography>
        <Typography variant="subtitle1" sx={{mb: 8}}>
          예약 날짜 : {selectedData.reserveDate.toISOString().split('T')[0]}
        </Typography>
        <Typography variant="subtitle1" sx={{mb: 8}}>
          예약 시작 시간 : {selectedData.startTime}
        </Typography>
        <Typography variant="subtitle1" sx={{mb: 8}}>
          예약 끝 시간 : {selectedData.endTime}
        </Typography>
        {/* <Typography variant="subtitle1">{selectedData.spaceId}</Typography> */}
        <Typography variant="subtitle1" sx={{mb: 8}}>
          예약 장소 : {selectedData.spaceName}
        </Typography>
        <Typography variant="subtitle1">
          예약 인원 수 : {selectedData.headCount}
        </Typography>
    </Box>
  );
}