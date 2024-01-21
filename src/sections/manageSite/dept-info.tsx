// react
import { useCallback, useState, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { userDeptState } from 'src/utils/atom';
import { updateDept } from 'src/api/deptApi';
import { IDeptInfo } from 'src/types/dept';
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

// ———————————————————————————————————
// ToDo: 파일 업로드 부분 수정 필요
export default function DepartmentInfoForm() {
  const [userDeptInfo, setUserDeptInfo] = useRecoilState(userDeptState);
  let deptId = '';
  if (typeof userDeptInfo === 'object') {
    deptId = `${userDeptInfo.deptId}`;
  }

  const defaultValues: IDeptInfo = useMemo(() => {
    if (typeof userDeptInfo === 'object') {
      return {
        deptId: userDeptInfo.deptId || 0,
        siteName: userDeptInfo.siteName || '',
        deptName: userDeptInfo.deptName || '',
        deptImage: userDeptInfo.deptImage || '',
        userAccept: Boolean(userDeptInfo.userAccept),
        maxRserveCount: Number(userDeptInfo.maxRserveCount),
        link: userDeptInfo.link || '',
        extraInfo: userDeptInfo.extraInfo || '',
        spaceCount: userDeptInfo.spaceCount || 0,
        memberCount: userDeptInfo.memberCount || 0,
        deptMemberResponse: userDeptInfo.deptMemberResponse || [],
      };
    }
    return {
      deptId: 0,
      siteName: '',
      deptName: '',
      deptImage: '',
      userAccept: false,
      maxRserveCount: 0,
      link: '',
      extraInfo: '',
      spaceCount: 0,
      memberCount: 0,
      deptMemberResponse: [],
    };
  }, [userDeptInfo]);

  const methods = useForm({
    defaultValues,
  });

  const { reset, setValue, handleSubmit } = methods;

  const [open, setOpen] = useState<boolean>(false);
  const [siteName, setSiteName] = useState(defaultValues.siteName);
  const [deptName, setDeptName] = useState(defaultValues.deptName);
  const [maxRserveCount, setMaxRserveCount] = useState(defaultValues.maxRserveCount);
  const [deptImage, setDeptImage] = useState(defaultValues.deptImage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (selectedFile) {
        // 파일을 서버로 업로드
        const formData = new FormData();
        formData.append('file', selectedFile);

        // const response = await axios.post('/upload-endpoint', formData);
        const response = await axiosInstance.patch(`${endpoints.dept.update}/${deptId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          const { filePath } = response.data;

          // 이미지 경로를 데이터에 추가
          data.deptImage = filePath;
        } else {
          // 업로드 실패 처리
          console.error('File upload failed');
        }
      }

      // 나머지 데이터 업데이트
      data.siteName = siteName;
      data.deptName = deptName;
      data.deptImage = deptImage;
      data.maxRserveCount = maxRserveCount;
      data.extraInfo = defaultValues.extraInfo;
      data.spaceCount = defaultValues.spaceCount;
      data.memberCount = defaultValues.memberCount;
      data.deptMemberResponse = defaultValues.deptMemberResponse;

      reset();

      // 서버로 데이터 전송
      await updateDept(data, Number(deptId));

      // ToDo: userAccept 부분 업데이트 시 업데이트 전 초기 값으로 되돌아감 (수정 필요)
      setUserDeptInfo(data);

      // modal
      setOpen(true);
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

      setSelectedFile(file); // 파일 저장

      if (newFile) {
        setValue('deptImage', file.name, { shouldValidate: true });
        console.log('파일 이름 정확히 들어갔나', newFile);
        setDeptImage(file.name);
      }
    },
    [setValue]
  );

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
              <RHFTextField
                name="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </Block>
            <Block label="기관 이름">
              <RHFTextField
                name="deptName"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
              />
            </Block>
            <Block label="자동으로 기관 입장 허가 여부">
              <FormControlLabel
                control={<RHFSwitch name="userAccept" label={null} sx={{ m: 0 }} />}
                label="허가없이 사용자 기관 가입"
                sx={{ mr: 2 }}
              />
            </Block>
            <Block label="사용자 최대 예약 가능 날짜">
              <RHFTextField
                name="maxRserveCount"
                type="number"
                value={maxRserveCount}
                onChange={(newValue) => {
                  const numericValue = parseFloat(newValue.target.value);
                  setMaxRserveCount(numericValue);
                }}
              />
            </Block>
            <Block label="URL 이름">
              <RHFTextField name="link" value={defaultValues?.link} disabled />
            </Block>
          </Stack>
          <Stack spacing={4}>
            <RHFUpload
              name="deptImage"
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('deptImage', '', { shouldValidate: true })}
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
