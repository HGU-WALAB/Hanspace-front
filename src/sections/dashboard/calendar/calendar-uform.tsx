import { useForm, Controller } from 'react-hook-form';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
// components
import FormProvider, { RHFTextField, RHFSwitch } from 'src/components/hook-form';
// types
import { ICalendarDate, ICalendarEvent } from 'src/types/calendar';

// ----------------------------------------------------------------------

type Props = {
  // colorOptions: string[];
  onClose: VoidFunction;
  currentEvent?: ICalendarEvent;
};

// const emailInfo = [
//   { email: "22100595@handong.ac.kr" },
//   { email: "22000019@handong.ac.kr" },
//   { email: "22100101@handong.ac.kr" },
//   { email: "22100123@handong.ac.kr" },
//   { email: "22100489@handong.ac.kr" },
//   { email: "22100230@handong.ac.kr" },
//   { email: "21900595@handong.ac.kr" },
//   { email: "22300592@handong.ac.kr" },
//   { email: "21700247@handong.ac.kr" },
//   { email: "21500852@handong.ac.kr" },
//   { email: "22200682@handong.ac.kr" },
//   { email: "21400374@handong.ac.kr" },
//   { email: "21600085@handong.ac.kr" },
//   { email: "22000128@handong.ac.kr" }
// ]; // email data


export default function CalendarUForm({ currentEvent, onClose }: Props) {

  const methods = useForm({
    defaultValues: currentEvent,
  });
  const {
    watch,
    control,
  } = methods;

  const values = watch();

  return (
    <FormProvider methods={methods}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="대여 사유" disabled/>
        <RHFTextField name="spaceName" label="대여 장소" disabled/>

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              value={new Date(field.value as ICalendarDate)}
              label="시작 날짜"
              format="yyyy/MM/dd hh:mm a"
              disabled
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              value={new Date(field.value as ICalendarDate)}
              label="끝 날짜"
              format="yyyy/MM/dd hh:mm a"
              disabled
            />
          )}
        />
        {/* {currentEvent?.invite && ( */}
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
              label="장소 예약을 공유할 사람의 이메일을 선택해주세요"
              placeholder="Email"
              sx={{ width: '300px' }}
            />
          )}
          sx={{ml: 0.5}}
        /> */}
        {/* )} */}
      </Stack>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="primary" onClick={onClose}>
          확인
        </Button>
      </DialogActions>
    </FormProvider>
  );
}
