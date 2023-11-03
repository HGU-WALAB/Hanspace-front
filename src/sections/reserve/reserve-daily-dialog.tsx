import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack, { StackProps } from '@mui/material/Stack';

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
import dayjs from 'dayjs';


interface ReserveDailyForm2Props {
    selectedData: {
      reserveDate: Date;
      startTime: string;
      endTime: string;
      // headCount: number; // 예상되는 데이터 타입에 따라 수정
      spaceId: number; // 예상되는 데이터 타입에 따라 수정
    };
    open: boolean;
    onClose: () => void;
  }
  
  interface InputField {
    value: string;
  }
export default function DailyReserveFormDialog({ open, onClose, selectedData}: ReserveDailyForm2Props) {
    const defaultValues = {
        spaceId: 1,
        memberId: 1,
        regularReserveId: null,
        reserveDate: selectedData.reserveDate,
        startTime: selectedData.startTime,
        endTime: selectedData.endTime,
        // headCount: selectedData.headCount,
        purpose: '',
        // phoneNumber: '',
        approve: '미승인',
        extraInfoAns: [ ],
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

          const onSubmit = handleSubmit(async (data) => {
            try {
              reset();
              // extraInfoAnsList를 문자열로 결합
              const extraInfoAns1 = data.extraInfoAns.join(', ');
              const reserve_date = dayjs(selectedData.reserveDate);
              const reserve_year = reserve_date.year();
              const reserve_month = reserve_date.month(); // 월은 0부터 시작
              const reserve_day = reserve_date.date();
              const reserveDate = new Date(reserve_year, reserve_month, reserve_day);
              const dataToSend = {
                spaceId: selectedData.spaceId,
                memberId: 1,
                regularReserveId: null,
                reserveDate: reserveDate.toISOString().split('T')[0],
                startTime: selectedData.startTime,
                endTime: selectedData.endTime,
                // headCount: selectedData.headCount,
                purpose: data.purpose,
                // phoneNumber: data.phoneNumber,
                status: '미승인',
                extraInfoAns: extraInfoAns1,
              };
              
              console.info('DATA', dataToSend);
        
              // const response = await axios
              //   .post(`${BASE_URL}/reserve`, dataToSend)
              //   .then((log) => console.log('log', log));
            } catch (error) {
              console.error(error);
            }
            onClose();
          });
          // 기관이 등록한 extra 요구 정보들을 불러오기
        // const [extraData, setextraData] = useState<string | null>(null);
        const [extraData, setextraData] = useState<string>("학부, 전화번호")
        // useEffect(() => {
        //   // 데이터를 가져오는 함수 정의
        //   const fetchData = async () => {
        //     try {
        //       // API생성되면 department id 받아서 그 id를 가지고 해당 dept/id로 호출해서 정보 받아오기
        //       const response = await axios.get(`${BASE_URL}/dept/deptId/1`);
        //       setextraData(response.data.extraInfo); // 데이터 설정
        //       console.log(response.data.extraInfo);
        //     } catch (error) {
        //       console.log("error");
        //     }
        //   };
    
        //   fetchData(); // 데이터 가져오기 함수 호출
        // }, []);
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
        <div>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle> 일일 예약 하기 </DialogTitle>
            <DialogContent>
              <FormProvider methods={methods} onSubmit={onSubmit}>
              <Stack spacing={2}>
                <Typography variant="body1">목적 *</Typography>
                <RHFTextField name="purpose" label="대여 목적을 입력해주세요." sx={{ width: '280px'}}/>
                {inputFields.map((field, index) => (
                    <div key={index}>
                    <Typography variant="body1">{words[index]} *</Typography>
                    <RHFTextField name={`extraInfoAns[${index}]`} label={`${words[index]}을 입력해주세요.`} sx={{ width: '280px'}} />
                </div>
                ))}
              </Stack>
              <DialogActions>
                <Button onClick={() => {onClose();}} variant="outlined" color="inherit" >
                  취소
                </Button>
                <Button onClick={() => {onSubmit();}} variant="contained" color="primary" >
                    대여하기
                </Button>
              </DialogActions>
              </FormProvider>
            </DialogContent>
        </Dialog>
        </div>
    );
}