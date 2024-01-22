import { yupResolver } from '@hookform/resolvers/yup';
// react
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userDeptState } from 'src/utils/atom';
import axiosInstance, { endpoints } from 'src/utils/axios';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha } from '@mui/material/styles';
// component
import FormProvider, { RHFTextField, RHFSwitch, RHFUpload } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import DepartmentUpdateSuccessDialog from './dept-dialog';
import { FormSchema } from './schema';

// ———————————————————————————————————
// ToDo: 파일 업로드 부분 수정 필요
export default function DepartmentInfoForm() {
  const [userDeptInfo, setUserDeptInfo] = useRecoilState(userDeptState);
  let deptId = '';
  if (typeof userDeptInfo === 'object') {
    deptId = `${userDeptInfo.deptId}`;
  }

  const defaultValues = useMemo(() => {
    if (typeof userDeptInfo === 'object') {
      return {
        deptId: userDeptInfo.deptId || 0,
        siteName: userDeptInfo.siteName || '',
        deptName: userDeptInfo.deptName || '',
        deptImage: userDeptInfo.deptImage || '',
        userAccept: userDeptInfo.userAccept || false,
        maxRserveCount: Number(userDeptInfo.maxRserveCount) || 0,
        link: userDeptInfo.link || '',
        extraInfo: userDeptInfo.extraInfo || '',
      };
    }
    // 기본값을 설정해야 합니다. 예를 들어, userDeptInfo가 객체가 아닐 때 기본값을 설정할 수 있습니다.
    return {
      deptId: 0,
      siteName: '',
      deptName: '',
      deptImage: '',
      userAccept: false,
      maxRserveCount: 0,
      link: '',
      extraInfo: '',
    };
  }, [userDeptInfo]);

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const { watch, reset, setValue, handleSubmit } = methods;

  const imageFile = watch('deptImage');

  const [open, setOpen] = useState<boolean>(false);

  const onSet = (data: any) => {
    const deptValue = {
      deptId: Number(deptId),
      siteName: data?.siteName,
      deptName: data?.deptName,
      deptImage: data?.deptImage,
      userAccept: data?.userAccepts,
      maxRserveCount: data?.maxReserveCount,
      link: defaultValues.link,
      extraInfo: defaultValues.extraInfo,
      spaceCount: typeof userDeptInfo === 'object' ? userDeptInfo.spaceCount : null,
      memberCount: typeof userDeptInfo === 'object' ? userDeptInfo.memberCount : null,
      deptMemberResponse: typeof userDeptInfo === 'object' ? userDeptInfo.deptMemberResponse : [],
    };

    setUserDeptInfo(deptValue);
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('siteName', data.siteName);
    formData.append('deptName', data.deptName);
    formData.append('maxRserveCount', data.maxRserveCount.toString());
    formData.append('link', defaultValues.link);
    formData.append('extraInfo', defaultValues.extraInfo);
    formData.append('userAccept', data.userAccept?.toString() || 'true');
    formData.append('deptImage', imageFile);

    onSet(data);

    const response = await axiosInstance
      .patch(`${endpoints.dept.update}/${deptId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch((e) => {
        console.log('error');
        console.log(e);
      });

    reset();

    // modal
    setOpen(true);
    window.location.reload();
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

  useEffect(() => {}, [userDeptInfo, onSubmit]);

  return (
    <>
      <DepartmentUpdateSuccessDialog open={open} onClose={() => setOpen(false)} />
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
              <RHFTextField name="siteName" />
            </Block>
            <Block label="기관 이름">
              <RHFTextField name="deptName" />
            </Block>
            <Block label="자동으로 기관 입장 허가 여부">
              <FormControlLabel
                control={<RHFSwitch name="userAccept" label={null} sx={{ m: 0 }} />}
                label="허가없이 사용자 기관 가입"
                sx={{ mr: 2 }}
              />
            </Block>
            <Block label="사용자 최대 예약 가능 날짜">
              <RHFTextField name="maxRserveCount" type="number" />
            </Block>
            <Block label="URL 이름">
              <RHFTextField name="link" disabled />
            </Block>
          </Stack>
          <Stack spacing={4}>
            <RHFUpload
              name="deptImage"
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('deptImage', null, { shouldValidate: true })}
              helperText="기관 대표 이미지를 선택해주세요"
            />
            <LoadingButton fullWidth color="primary" size="large" type="submit" variant="soft">
              수정하기
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
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
