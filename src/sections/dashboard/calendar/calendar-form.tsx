import { useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
// utils
import uuidv4 from 'src/utils/uuidv4';
import { fTimestamp } from 'src/utils/format-time';
// api
import { createEvent, updateEvent, deleteEvent } from 'src/api/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFTextField, RHFSwitch } from 'src/components/hook-form';
// types
import { ICalendarEvent, ICalendarDate } from 'src/types/calendar';
import { defaultValues } from 'src/sections/reserve/reserve-daily-form1';

// ----------------------------------------------------------------------

type Props = {
  // colorOptions: string[];
  onClose: VoidFunction;
  currentEvent?: ICalendarEvent;
};

export default function CalendarForm({ currentEvent, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('제목을 입력해주세요'),
    // description: Yup.string().max(5000, '설명은 5000자 이상 입력할 수 없습니다'),
    // not required
    color: Yup.string(),
    allDay: Yup.boolean(),
    start: Yup.mixed(),
    end: Yup.mixed(),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: currentEvent,
  });


  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const dateError = values.start && values.end ? values.start > values.end : false;

  // const onSubmit = handleSubmit(async (data) => {
  //   const eventData: ICalendarEvent = {
  //     id: currentEvent?.id ? currentEvent?.id : uuidv4(),
  //     color: data?.color,
  //     title: data?.title,
  //     allDay: data?.allDay,
  //     description: data?.description,
  //     end: data?.end,
  //     start: data?.start,
  //   } as ICalendarEvent;

  //   try {
  //     if (!dateError) {
  //       if (currentEvent?.id) {
  //         await updateEvent(eventData);
  //         enqueueSnackbar('수정되었습니다!');
  //       } else {
  //         await createEvent(eventData);
  //         enqueueSnackbar('추가되었습니다!');
  //       }
  //       onClose();
  //       reset();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  // const onDelete = useCallback(async () => {
  //   try {
  //     await deleteEvent(`${currentEvent?.id}`);
  //     enqueueSnackbar('삭제되었습니다!');
  //     onClose();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [currentEvent?.id, enqueueSnackbar, onClose]);

  return (
    // <FormProvider methods={methods} onSubmit={onSubmit}>
    <FormProvider methods={methods}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="제목"/>
        <RHFTextField name="spaceName" label="장소"/>
        {/* <RHFTextField name="description" label="설명" multiline rows={3} disabled/> */}

        {/* <RHFSwitch name="allDay" label="요일 전체" /> */}

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              value={new Date(field.value as ICalendarDate)}
              onChange={(newValue) => {
                if (newValue) {
                  field.onChange(fTimestamp(newValue));
                }
              }}
              label="시작 날짜"
              format="yyyy/MM/dd hh:mm a"
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
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
              onChange={(newValue) => {
                if (newValue) {
                  field.onChange(fTimestamp(newValue));
                }
              }}
              label="끝 날짜"
              format="yyyy/MM/dd hh:mm a"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: dateError,
                  helperText: dateError && '끝 날짜는 시작 날짜보다 이전일 수 없습니다',
                },
              }}
            />
          )}
        />

        {/* <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              selected={field.value as string}
              onSelectColor={(color) => field.onChange(color as string)}
              colors={colorOptions}
            />
          )}
        /> */}
      </Stack>

      <DialogActions>
        {/* {!!currentEvent?.id && (
          <Tooltip title="삭제하기">
            <IconButton onClick={onDelete}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        )} */}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="primary" onClick={onClose}>
          확인
        </Button>

        {/* <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={dateError}
        >
          추가
        </LoadingButton> */}
      </DialogActions>
    </FormProvider>
  );
}