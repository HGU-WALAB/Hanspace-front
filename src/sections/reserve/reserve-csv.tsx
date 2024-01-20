// react
import styled from 'styled-components';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// components
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFUpload } from 'src/components/hook-form';
import { useCallback } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import RowRadioButtonsGroup from './reserve-radio';

// ———————————————————————————————————
interface ReserveCSVFormProps {
  selectedValue: string;
  handleRadioChange: (data: string) => void;
}

export default function ReserveCSVForm({ selectedValue, handleRadioChange }: ReserveCSVFormProps) {
  const defaultValues = {
    // spaceId: 1,
    // memberId: 1,
    // regularReserveId: null,
    // reserveDate: selectedData.reserveDate,
    // startTime: selectedData.startTime,
    // endTime: selectedData.endTime,
    // headCount: selectedData.headCount,
    // groupName: '',
    // purpose: '',
    // phoneNumber: '',
    // approve: '미승인',
    // extraInfoAns: [ ],
    csvfile: '',
  };
  const methods = useForm({
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

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        console.log('csv file name', newFile.preview);
        setValue('csvfile', newFile.toString(), { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Box>
      <Typography variant="h6" color="primary" sx={{ marginBottom: '45px' }}>
        CSV 파일로 예약하기
      </Typography>
      <FormProvider methods={methods}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <RowRadioButtonsGroup selectedValue={selectedValue} onValueChange={handleRadioChange} />
            <Button
              variant="outlined"
              color="inherit"
              sx={{ width: '320px', height: '55px', mt: 2, mb: 1 }}
            >
              업로드 양식 다운로드하기
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Block label=" CSV 파일 업로드하기">
            <RHFUpload
              name="csvfile"
              // maxSize={3145728}
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('csvfile', '', { shouldValidate: true })}
            />
          </Block>
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: '300px', height: '55px', borderRadius: '50px', mt: 5 }}
          >
            확인
          </Button>
        </div>
      </FormProvider>
    </Box>
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
