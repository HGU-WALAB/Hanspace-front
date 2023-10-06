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
import { FormSchema } from './schema';
// ----------------------------------------------------------------------

export const defaultValues = {
  age: 0,
  email: '',
  fullName: '',
  //
  editor: '',
  switch: false,
  radioGroup: '',
  autocomplete: null,
  //
  password: '',
  confirmPassword: '',
  //
  startDate: null,
  endDate: null,
  //
  singleUpload: null,
  multiUpload: [],
  //
  singleSelect: '',
  multiSelect: [],
  //
  checkbox: false,
  multiCheckbox: [],
  //
  slider: 8,
  sliderRange: [15, 80],
};

export default function FormDialog() {
  const dialog = useBoolean();

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('singleUpload', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Button variant="outlined" color="warning" onClick={dialog.onTrue}>
        + 장소 추가
      </Button>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>장소 추가</DialogTitle>

        <DialogContent>
          {/* <Typography sx={{ mb: 3 }}>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </Typography> */}

          {/* <TextField
            autoFocus
            fullWidth
            type="email"
            margin="dense"
            variant="outlined"
            label="Email Address"
          /> */}

          <Stack spacing={2}>
            {/* <Block> */}
            <RHFTextField name="fullName" label="장소명" />
            {/* </Block> */}

            {/* <Block> */}
            <RHFTextField name="email" label="수용 가능 인원" type="number" />
            {/* </Block> */}

            {/* <Block> */}
            {/* <RHFTextField name="age" label="etc" /> */}
            {/* </Block> */}

            {/* <Block label="RHFUpload"> */}
            <RHFUpload
              name="singleUpload"
              // maxSize={3145728}
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('singleUpload', null, { shouldValidate: true })}
            />
            {/* </Block> */}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={dialog.onFalse} variant="contained">
            Subscribe
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
