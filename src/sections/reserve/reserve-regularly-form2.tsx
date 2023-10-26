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
import dayjs from 'dayjs';


const Text = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  margin: 0px;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 8px;
`;

// ———————————————————————————————————
interface ReserveRegularyForm2Props {
    onPrevClick: () => void;
    selectedData: {
        startDate: Date | null;
        endDate: Date | null;
        week: string | null;
        startTime: string | null;
        endTime: string | null;
        headCount: number | null;
        spaceId: number | null;
    }
};

interface InputField {
  value: string;
}

export default function ReserveRegularyForm2({ onPrevClick, selectedData }: ReserveRegularyForm2Props) {  
  const defaultValues = {
    memberId: 1,
    startDate: selectedData.startDate,
    endDate: selectedData.endDate,
    week: selectedData.week,
    startTime: selectedData.startTime,
    endTime: selectedData.endTime,
    headCount: selectedData.headCount,
    spaceId: selectedData.spaceId,
    purpose: '',
    // phoneNumber: '',
    status: '미승인',
    extraInfoAns: [ ],
    reserveCount: 0,
    reserveDate: [ ],
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
        // extraInfoAnsList를 문자열로 결합
        const extraInfoAns1 = data.extraInfoAns.join(', ');
        const week1 = Array.isArray(data.week) ? data.week.join(', ') : data.week;
        const start_date = dayjs(selectedData.startDate);
        const start_year = start_date.year();
        const start_month = start_date.month(); // 월은 0부터 시작
        const start_day = start_date.date();
        const end_date = dayjs(selectedData.endDate);
        const end_year = end_date.year();
        const end_month = end_date.month(); // 월은 0부터 시작
        const end_day = end_date.date();
        const startDate = new Date(start_year, start_month, start_day);  // 월은 0부터 시작해서 9는 10월입니다.
        const endDate = new Date(end_year, end_month, end_day);
        const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const reserve_Date = [ ];

        while (startDate <= endDate) {
            for (let i = 0; i < 7; i += 1) {
                if (selectedData.week?.includes(dayOfWeek[i]) && startDate.getDay() === i) {
                    const dateStr = startDate.toISOString().split('T')[0];
                    reserve_Date.push(dateStr);
                    defaultValues.reserveCount += 1;
                }
              }
            startDate.setDate(startDate.getDate() + 1);
        }
        const dataToSend = {
            memberId: 1,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            week: week1,
            startTime: selectedData.startTime,
            endTime: selectedData.endTime,
            headCount: selectedData.headCount,
            spaceId: selectedData.spaceId,
            purpose: data.purpose,
            // phoneNumber: data.phoneNumber,
            status: '미승인',
            extraInfoAns: extraInfoAns1,
            reserveCount: defaultValues.reserveCount,
            reserveDate: reserve_Date,
        };
        
        console.info('DATA', dataToSend);
  
        const response = await axios
          .post(`${BASE_URL}/regularReserve`, dataToSend)
          .then((log) => console.log('log', log));
        reset();
      } catch (error) {
        console.error(error);
      }
      onPrevClick();
    });

    const handlePrevClick = () => {
      // 이전 페이지로 이동
      onPrevClick();
    };

    const [extraData, setextraData] = useState<string | null>(null);
    useEffect(() => {
      // 데이터를 가져오는 함수 정의
      const fetchData = async () => {
        try {
          // API생성되면 department id 받아서 그 id를 가지고 해당 dept/id로 호출해서 정보 받아오기
          const response = await axios.get(`${BASE_URL}/dept/deptId/1`);
          setextraData(response.data.extraInfo); // 데이터 설정
          console.log(response.data.extraInfo);
        } catch (error) {
          console.log("error");
        }
      };
  
      fetchData(); // 데이터 가져오기 함수 호출
    }, []);

    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [words, setWords] = useState<string[]>([]);
    useEffect(() => {
      if (extraData) {
        const word = extraData.split(',');
        const initialFields = word.map(() => ({ value: '' }));
        setInputFields(initialFields);
        setWords(word);
      }
    }, [extraData, words]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F2F1FA', borderRadius: '20px 0 0 0', paddingLeft: '20px'}}>
    <Typography variant="h4" style={{ padding: '20px 0 20px 0', color: '#5D5A88'}}> 
      Make a Regulary Reservation
    </Typography>
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {/* <Text>모임명 *</Text>
        <RHFTextField name="groupName" label="모임명을 입력해주세요." sx={{ width: '280px'}}/> */}
      <Text>목적 *</Text>
        <RHFTextField name="purpose" label="대여 목적을 입력해주세요." sx={{ width: '280px'}}/>
      {/* <Text>연락처 *</Text>
        <RHFTextField name="phoneNumber" label="연락처를 입력해주세요." sx={{ width: '280px'}}/> */}
      {inputFields.map((field, index) => (
        <div key={index}>
        <Text>{words[index]} *</Text>
        <RHFTextField name={`extraInfoAns[${index}]`} label={`${words[index]}을 입력해주세요.`} sx={{ width: '280px'}} />
      </div>
      ))}
      <div style={{ marginTop: '100px' }}>
      <Button onClick={handlePrevClick} variant="outlined" color="inherit" sx={{ width: '100px', marginRight: '10px'}}>
        이전
      </Button>
      <Button variant="contained" onClick={() => {onSubmit();}} sx={{ width: '100px'}}>
        대여하기
      </Button>
      </div>
    </FormProvider>
    </Box>
  );
}