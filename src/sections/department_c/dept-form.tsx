import { yupResolver } from '@hookform/resolvers/yup';
// react
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import axiosInstance, { endpoints } from 'src/utils/axios';
// @mui
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import { alpha } from '@mui/material/styles';
// component
import FormProvider, { RHFTextField, RHFSwitch, RHFUpload } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import DynamicTextField from '../reserve/dynamic-textfield';
import DeptPopover from './dept-popover';
import DepartmentCreateSuccessDialog from './dept-dialog';
import { FormSchema } from './schema';

const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
`;
// ———————————————————————————————————
export default function DepartmentForm() {
  const defaultValues = {
    siteName: '',
    deptName: '',
    deptImage: '',
    userAccept: false,
    maxRserveCount: 0,
    link: '',
    extraInfo: '',
  };
  const [extraInfomation, setExtraInfomation] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const updateExtraInfo = (newExtraInfo: string) => {
    setExtraInfomation(newExtraInfo);
  };

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const { watch, reset, setValue, handleSubmit } = methods;

  const imageFile = watch('deptImage');

  const onSubmit = handleSubmit(async (data) => {
    console.log('submit!');
    console.log(data);

    const formData = new FormData();
    formData.append('siteName', data.siteName);
    formData.append('deptName', data.deptName);
    formData.append('userAccept', data.userAccept.toString());
    formData.append('maxRserveCount', data.maxRserveCount.toString());
    formData.append('link', data.link);
    formData.append('extraInfo', extraInfomation);
    formData.append('deptImage', imageFile);
    console.log(formData.forEach((value, key) => console.log(key, value)));

    reset();
    await axiosInstance
      .post(endpoints.dept.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch((e) => {
        console.log('error');
        console.log(e);
      });
    setOpen(true);

    // ToDo: 기관 생성 api 연결
    // try {
    //   data.maxRserveCount = maxRserveCount ?? 0;
    //   data.extraInfo = extraInfo;
    //   data.logoImage = '';
    //   await createDept(data);
    //   reset();
    //   setMaxRserveCount(undefined);
    //   setExtraInfo('');
    //   // modal
    //   setOpen(true);
    // } catch (error) {
    //   console.error(error);
    // }
  });

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('deptImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          gap={5}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
          sx={{
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            padding: 2,
          }}
        >
          <Stack spacing={2}>
            <Block label="사이트 이름">
              <RHFTextField name="siteName" label="사이트 이름을 입력해주세요." />
            </Block>
            <Block label="기관 이름">
              <RHFTextField name="deptName" label="기관 이름을 입력해주세요." />
            </Block>
            <Block label="자동으로 기관 입장 허가 여부">
              <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={<RHFSwitch name="userAccept" label={null} sx={{ m: 0 }} />}
                  label="허가없이 사용자 기관 가입"
                  sx={{ mr: 2 }}
                />
                <DeptPopover filed="userAccept" />
              </Div>
            </Block>
            <Block label="사용자 최대 예약 가능 날짜">
              <RHFTextField
                name="maxRserveCount"
                label="사용자 최대 예약 가능 날짜를 입력해주세요."
                type="number"
              />
            </Block>
            <Block label="URL 이름">
              <RHFTextField name="link" label="URL 이름을 입력해주세요." />
            </Block>
            <Block label="예약시 추가로 얻고 싶은 정보">
              <Div>
                <DynamicTextField onUpdateExtraInfo={updateExtraInfo} />
              </Div>
            </Block>
          </Stack>
          <Stack spacing={10}>
            <RHFUpload
              name="deptImage"
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('deptImage', null, { shouldValidate: true })}
              helperText="기관 대표 이미지를 선택해주세요"
            />
            <LoadingButton fullWidth color="primary" size="large" type="submit" variant="soft">
              추가하기
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>

      <DepartmentCreateSuccessDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

// ----------------------------------------------------------------------

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

function Block({ label, sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          color: '#5F5F5F',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
