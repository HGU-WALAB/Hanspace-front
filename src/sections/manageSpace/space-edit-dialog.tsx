import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack, { StackProps } from '@mui/material/Stack';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import FormProvider, {
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
import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Backdrop, CircularProgress } from '@mui/material';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { BASE_URL } from 'src/config-global';
import { ISpaceItem, EXSpaceItem } from 'src/types/space';
import { FormSchema } from './schema';
// ----------------------------------------------------------------------

type SpaceEditDialogProps = {
  open: boolean;
  onClose: () => void;
  currentSpace?: EXSpaceItem | null; // if you want to pass the space being edited
};

export default function SpaceEditDialog({ open, onClose, currentSpace }: SpaceEditDialogProps) {
  const dialog = useBoolean();

  const defaultValues = useMemo(
    () => ({
      deptId: 0,
      name: currentSpace?.name || '',
      headCount: currentSpace?.headCount || 0,
      availableStart: currentSpace?.availableStart || '',
      availableEnd: currentSpace?.availableEnd || '',
      detail: currentSpace?.detail || '',
      availability: currentSpace?.availability || true,
    }),
    [currentSpace]
  );

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    // watch,
    reset,
    // control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      reset();
      console.info('DATA', data);

      const response = await axios
        .post(`${BASE_URL}/space`, data)
        .then((log) => console.log('log', log));

      dialog.onFalse();
    } catch (error) {
      console.error(error);
    }
  });

  // const handleDropSingleFile = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (newFile) {
  //       setValue('image', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  const startTime = new Date();
  const endTime = new Date();

  const startString = currentSpace?.availableStart;
  const endString = currentSpace?.availableEnd;

  if (startString && endString) {
    const [shour, smin] = startString.split(':').map((s) => parseInt(s, 10));
    const [ehour, emin] = endString.split(':').map((e) => parseInt(e, 10));

    startTime.setHours(shour, smin, 0);
    endTime.setHours(ehour, emin, 0);
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>장소 정보 수정</DialogTitle>

        <DialogContent>
          <Typography sx={{ width: '500px', marginBottom: '10px' }}>
            수정 할 장소의 정보를 수정 후 저장해주세요.
          </Typography>

          <Stack spacing={2}>
            {/* 지워야함 이거  */}
            <RHFTextField name="deptId" label="deptId" type="number" />

            <RHFTextField name="name" label="장소명" />

            <RHFTextField name="headCount" label="수용 가능 인원" type="number" />

            <DesktopTimePicker
              label="예약가능 시작시간"
              value={startTime}
              onChange={(newValue) => {
                if (newValue !== null) {
                  const dateObject = new Date(newValue);
                  const formattedTime = dateObject.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  setValue('availableStart', formattedTime);
                }
              }}
            />
            <DesktopTimePicker
              label="예약가능 끝시간"
              value={endTime}
              onChange={(newValue) => {
                if (newValue !== null) {
                  const dateObject = new Date(newValue);
                  const formattedTime = dateObject.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  setValue('availableEnd', formattedTime);
                  console.log(formattedTime);
                }
              }}
            />

            <RHFTextField name="detail" label="추가 정보" />

            <RHFSwitch name="availability" label="사용 가능 여부" />

            {/* <Block label="RHFUpload"> */}
            {/* <RHFUpload
              name="singleUpload"
              // maxSize={3145728}
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('singleUpload', null, { shouldValidate: true })}
            /> */}
            {/* </Block> */}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            취소
          </Button>
          <Button
            onClick={() => {
              onSubmit(); // Submit the form
            }}
            variant="contained"
          >
            수정하기
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}

// ----------------------------------------------------------------------

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

function Block({ label = 'RHFTextField', sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'right',
          fontStyle: 'italic',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
