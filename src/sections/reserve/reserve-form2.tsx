// react
import { useState } from "react";
// @mui
import Button from '@mui/material/Button';
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

import axios from 'axios';
import { BASE_URL } from 'src/config-global';


// ———————————————————————————————————
// export const defaultValues = {
//   id: 1,
//   reserveDate: '',
//   startTime: '',
//   endTime: '',
//   headCount: 0,
//   groupName: '',
//   purpose: '',
//   phoneNumber: '',
//   approve: '미승인',
//   extraInfoAns: '',
//   // image: 'https://m.s1campus.co.kr:1543/comm/images/facility/b_lecture1.jpg',
//   //
// };
interface ReserveForm2Props {
  onPrevClick: () => void;
  selectedData: {
    reserveDate: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    headCount: number | null; // 예상되는 데이터 타입에 따라 수정
    spaceId: number | null; // 예상되는 데이터 타입에 따라 수정
  };
}

export default function ReserveForm2({ onPrevClick, selectedData }: ReserveForm2Props) {  
  const defaultValues = {
    spaceId: 1,
    memberId: 1,
    regularReserveId: null,
    reserveDate: selectedData.reserveDate,
    startTime: selectedData.startTime,
    endTime: selectedData.endTime,
    headCount: selectedData.headCount,
    groupName: '',
    purpose: '',
    phoneNumber: '',
    approve: '미승인',
    extraInfoAns: '',
    // image: 'https://m.s1campus.co.kr:1543/comm/images/facility/b_lecture1.jpg',
    // extraInfoAns : list 
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

    const onSubmit = handleSubmit(async (data) => {
      try {
        reset();
        console.info('DATA', data);
  
        const response = await axios
          .post(`${BASE_URL}/reserve`, data)
          .then((log) => console.log('log', log));
      } catch (error) {
        console.error(error);
      }
    });

    const handlePrevClick = () => {
      // 이전 페이지로 이동
      onPrevClick();
    };



  return (
    <>
    <FormProvider methods={methods} onSubmit={onSubmit}>
    <p>예약 날짜: {selectedData.reserveDate ? selectedData.reserveDate.toLocaleString() : '날짜가 선택되지 않았습니다.'}</p>
    <p>예약 시작 시간: {selectedData.startTime ? selectedData.startTime.toLocaleString() : '시간이 선택되지 않았습니다.'}</p>
    <p>예약 끝 시간: {selectedData.endTime ? selectedData.endTime.toLocaleString() : '시간이 선택되지 않았습니다.'}</p>
    <p>선택한 수용 인원: {selectedData.headCount}명 이상</p>
    <p>선택한 이용 공간: {selectedData.spaceId || '공간이 선택되지 않았습니다.'}</p>
      <RHFTextField name="groupName" label="모임명" />
      <RHFTextField name="purpose" label="목적" />
      <RHFTextField name="phoneNumber" label="연락처" />
      <div style={{ marginTop: '100px' }}>
      <Button onClick={handlePrevClick} variant="outlined" color="inherit">
        이전
      </Button>
      <Button variant="contained" onClick={() => {onSubmit();}}>
        예약하기
      </Button>
      </div>
    </FormProvider>
    </>
  );
}