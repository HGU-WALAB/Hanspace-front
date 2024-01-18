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
import { useCallback } from 'react';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { BASE_URL } from 'src/config-global';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { FormSchema } from './schema';
// ----------------------------------------------------------------------

export const defaultValues = {
  deptId: 0,
  name: '',
  headCount: 0,
  availableStart: '',
  availableEnd: '',
  detail: '',
  availability: true,
  image: '',
  //
};

export default function SpaceCreateDialog({
  deptId,
  refetchSpaces,
}: {
  deptId: number;
  refetchSpaces: any;
}) {
  const dialog = useBoolean();

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    // control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const imageFile = watch('image');

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('deptId', deptId?.toString());
    formData.append('name', data.name);
    formData.append('headCount', data.headCount.toString());
    formData.append('availableStart', data.availableStart);
    formData.append('availableEnd', data.availableEnd);
    formData.append('detail', data.detail);
    formData.append('availability', data.availability?.toString() || 'true');
    formData.append('image', imageFile);

    console.log(formData.forEach((value, key) => console.log(key, value)));

    reset();

    axiosInstance
      .patch(endpoints.space.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        refetchSpaces();
        dialog.onFalse();
      })
      .catch((e) => {
        console.log('error');
        console.log(e);
      });
  });

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Button variant="outlined" color="primary" onClick={dialog.onTrue}>
        + 장소 추가
      </Button>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>장소 추가</DialogTitle>

        <DialogContent>
          <Typography sx={{ width: '500px', marginBottom: '10px' }}>
            추가 할 장소의 정보를 입력해주세요.
          </Typography>

          <Stack spacing={2}>
            <RHFTextField name="name" label="장소명" />

            <RHFTextField name="headCount" label="수용 가능 인원" type="number" />

            <DesktopTimePicker
              label="예약가능 시작시간"
              value={methods.watch('availableStart') || defaultDate}
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
              value={methods.watch('availableEnd') || defaultDate}
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

            <Block label="장소 사진">
              <RHFUpload
                name="image"
                // maxSize={3145728}
                onDrop={handleDropSingleFile}
                onDelete={() => setValue('image', null, { shouldValidate: true })}
              />
            </Block>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            취소
          </Button>
          <Button
            onClick={() => {
              onSubmit(); // Submit the form
            }}
            variant="contained"
          >
            추가하기
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
