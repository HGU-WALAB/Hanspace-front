import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { DesktopTimePicker } from '@mui/x-date-pickers';

// components
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import dayjs from 'dayjs';
import Image from 'src/components/image';
import ReserveSuccessDialog from './reserve-dialog';

interface ReserveRegularlyForm2Props {
  selectedData: {
    startDate: Date | null;
    endDate: Date | null;
    week: string | null;
    startTime: string | null;
    endTime: string | null;
    // headCount: number | null;
    spaceId: number | null;
    spaceName: string;
    spaceImage: string;
  };
  open: boolean;
  onClose: () => void;
}

interface InputField {
  value: string;
}
export default function RegularlyReserveDialog({
  open,
  onClose,
  selectedData,
}: ReserveRegularlyForm2Props) {
  const defaultValues = {
    memberId: 1,
    startDate: selectedData.startDate,
    endDate: selectedData.endDate,
    week: selectedData.week,
    startTime: selectedData.startTime,
    endTime: selectedData.endTime,
    // headCount: selectedData.headCount,
    spaceId: selectedData.spaceId,
    purpose: '',
    // phoneNumber: '',
    status: '미승인',
    extraInfoAns: [],
    reserveCount: 0,
    reserveDate: [],
  };
  const methods = useForm({
    defaultValues,
  });
  const {
    // watch,
    reset,
    // control,
    // setValue,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const handleSuccessDialogControl = () => {
    setIsSuccessDialogOpen(true);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      reset();
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
      const startDate = new Date(start_year, start_month, start_day); // 월은 0부터 시작해서 9는 10월입니다.
      const endDate = new Date(end_year, end_month, end_day);
      const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
      const reserve_Date = [];

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
        // headCount: selectedData.headCount,
        spaceId: selectedData.spaceId,
        purpose: data.purpose,
        status: '미승인',
        extraInfoAns: extraInfoAns1,
        reserveCount: defaultValues.reserveCount,
        reserveDate: reserve_Date,
      };

      console.info('DATA', dataToSend);

      // const response = await axios
      //   .post(`${BASE_URL}/reserve`, dataToSend)
      //   .then((log) => console.log('log', log));

      handleSuccessDialogControl();
    } catch (error) {
      console.error(error);
    }
    onClose();
  });
  // 기관이 등록한 extra 요구 정보들을 불러오기
  // const [extraData, setextraData] = useState<string | null>(null);
  const [extraData] = useState<string>('담당 교수님 성함, 사용 인원');
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
  const startTimeAsDate = new Date(`1970-01-01T${selectedData.startTime}`);
  const endTimeAsDate = new Date(`1970-01-01T${selectedData.endTime}`);
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle> {selectedData.spaceName} 공간 대여하기 </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                선택한 정보
              </Typography>
              <DesktopTimePicker
                label="예약 시작 시간"
                value={startTimeAsDate}
                sx={{ margin: '0 0 0 0', width: '180px' }}
                readOnly
              />
              <DesktopTimePicker
                label="예약 종료 시간"
                value={endTimeAsDate}
                sx={{ margin: '15px 0 0 0', width: '180px' }}
                readOnly
              />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {' '}
                요일 : {selectedData.week}
              </Typography>
              <Image src={selectedData.spaceImage} sx={{ mt: 1, width: 180, height: 100 }} />
            </Grid>
            <Grid item xs={5} sx={{ mr: 4 }}>
              <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <Typography variant="body1">목적 *</Typography>
                  <RHFTextField
                    name="purpose"
                    label="대여 목적을 입력해주세요."
                    sx={{ width: '280px' }}
                  />
                  {inputFields.map((field, index) => (
                    <div key={index}>
                      <Typography variant="body1">{words[index]} *</Typography>
                      <RHFTextField
                        name={`extraInfoAns[${index}]`}
                        label={`${words[index]}을 입력해주세요.`}
                        sx={{ width: '280px' }}
                      />
                    </div>
                  ))}
                </Stack>
                <DialogActions>
                  <Button
                    onClick={() => {
                      onClose();
                    }}
                    variant="outlined"
                    color="inherit"
                    sx={{ width: 1 }}
                  >
                    취소
                  </Button>
                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                    variant="contained"
                    color="primary"
                    sx={{ width: 1 }}
                  >
                    대여
                  </Button>
                </DialogActions>
              </FormProvider>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <ReserveSuccessDialog
        open={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
      />
    </div>
  );
}
