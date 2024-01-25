import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { userDeptState } from 'src/utils/atom';
import { useRecoilValue } from 'recoil';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { createReserve } from 'src/api/reserveApi';

// components
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import dayjs from 'dayjs';
import ReserveSuccessDialog from './reserve-dialog';

interface ReserveDailyForm2Props {
  selectedData: {
    reserveDate: Date;
    startTime: string;
    endTime: string;
    // headCount: number; // 예상되는 데이터 타입에 따라 수정
    spaceId: number; // 예상되는 데이터 타입에 따라 수정
    spaceName: string;
    spaceImage: string;
  };
  open: boolean;
  onClose: () => void;
}

interface InputField {
  value: string;
}
export default function DailyReserveFormDialog({
  open,
  onClose,
  selectedData,
}: ReserveDailyForm2Props) {
  const defaultValues = {
    spaceId: selectedData.spaceId,
    regularReserveId: null,
    reserveDate: selectedData.reserveDate,
    startTime: selectedData.startTime,
    endTime: selectedData.endTime,
    purpose: '',
    approve: '미승인',
    extraInfoAns: [],
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
  // 기관이 등록한 extra 요구 정보들을 불러오기

  const [extraData, setExtraData] = useState<string | null>(null);
  const userDeptValue = useRecoilValue(userDeptState);
  useEffect(() => {
    let deptId = 0;

    if (typeof userDeptValue === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ deptId } = userDeptValue);
      setExtraData(userDeptValue.extraInfo);
      console.log(userDeptState);
    }
  }, [userDeptValue]);

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const handleSuccessDialogControl = () => {
    setIsSuccessDialogOpen(true);
  };

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
        regularReserveId: null,
        reserveDate: reserveDate.toISOString().split('T')[0],
        startTime: selectedData.startTime,
        endTime: selectedData.endTime,
        purpose: data.purpose,
        status: '미승인',
        extraInfoAns: extraInfoAns1,
      };

      console.info('DATA', dataToSend);
      await createReserve(dataToSend);
      handleSuccessDialogControl();
    } catch (error) {
      console.error(error);
    }
    onClose();
  });

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
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle> {selectedData.spaceName} 공간 대여하기 </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* <DatePicker
                label="예약 날짜"
                value={selectedData.reserveDate}
                sx={{ width: '200px', mr: 3 }}
                readOnly
              /> */}
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
              <Box
                component="img"
                src="/assets/images/main/finance.svg"
                sx={{ mt: 3, width: 180, height: 150 }}
              />
              {/* <Image src={Finance} sx={{ mt: 3, width: 180, height: 150 }} /> */}
            </Grid>
            <Grid item xs={5} sx={{ mr: 5 }}>
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
                  {/* ToDo: 추후 예약 공유 기능 추가 예정 */}
                  {/* <Autocomplete
                    multiple
                    id="tags-standard"
                    options={emailInfo}
                    getOptionLabel={(option) => option.email}
                    defaultValue={[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="예약을 공유할 사람의 이메일을 선택해주세요"
                        placeholder="Email"
                        sx={{ width: '280px' }}
                      />
                    )}
                  /> */}
                </Stack>
                <DialogActions style={{ paddingRight: 0 }}>
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
    </>
  );
}
