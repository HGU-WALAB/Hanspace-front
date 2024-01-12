// react
import { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import FormControlLabel from "@mui/material/FormControlLabel";
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
// component
import FormProvider , {
    RHFTextField,
    RHFSwitch,
    RHFUploadAvatar,
    RHFSelect,
    RHFUploadBox,
    RHFUpload,
  } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import Image from 'src/components/image';
import DynamicTextField from "../reserve/dynamic-textfield";

import DepartmentUpdateSuccessDialog from './dept-dialog';


const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
`;
// ———————————————————————————————————
export const defaultValues = {
    siteName: 'Computer Science', 
    deptName: '전산전자공학부',
    logoImage: '',
    color: 'red',
    userAccept: true,
    maxRserveCount: 5,
    link: '/ComputerScience',
    extraInfo: '',
    // siteInfoTitle: '',
    // siteInfoDetail: '',
};

export default function DepartmentInfoForm() {
    // const settings = useSettingsContext();
    const methods = useForm({
        defaultValues
    });
    const {
        // watch,
        reset,
        // control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [logoImageName, setLogoImageName] = useState('');
    const [logoImagePreview, setLogoImagePreview] = useState<string | null>(null);
    const [maxRserveCount, setMaxRserveCount] = useState(defaultValues.maxRserveCount);
    const [extraInfo, setExtraInfo] = useState('');
    const [open, setOpen] = useState<boolean>(false);

    const updateExtraInfo = (newExtraInfo: string) => {
        setExtraInfo(newExtraInfo);
    }

    const onSubmit = handleSubmit(async (data) => {
        try {
            data.maxRserveCount = maxRserveCount;
            data.extraInfo = extraInfo;
            reset();
            console.log('넘어오는 data', data);

            // modal
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
      });

      const handleDropSingleFile = useCallback(
        (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
      
          if (file) {
            setValue('logoImage', file.name, { shouldValidate: true });
            setLogoImageName(file.name);
      
            // Create a data URL for image preview if e.target is available
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target) {
                setLogoImagePreview(e.target.result as string | null);
              }
            };
            reader.readAsDataURL(file);
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
          <RHFTextField name="siteName" />
        </Block>
        <Block label="기관 이름">
            <RHFTextField name="deptName" />
        </Block>
        <Block label="자동으로 기관 입장 허가 여부">
            {/* <Typography variant="subtitle1" sx={{ flexGrow: 1 , mr: 4 }}>로고 사진 *</Typography>
            <Typography variant="body2">{logoImageName}</Typography>
            <RHFUploadBox
              name="singleUpload"
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('logo', '', { shouldValidate: true })}
            /> */}
              <FormControlLabel 
                  control={ <RHFSwitch name="userAccept" label={null} sx={{ m: 0 }} />}
                  label="허가없이 사용자 기관 가입"
                  sx={{mr: 2}}
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
            <RHFTextField name="link" disabled/>
        </Block>
      </Stack>
      <Stack spacing={4}>
        <RHFUpload
          name="logoImage"
          onDrop={handleDropSingleFile}
          onDelete={() => setValue('logoImage', '', { shouldValidate: true })}
          helperText = "기관 로고 이미지를 선택해주세요"
        /> 
        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="soft"
          onClick={() => {onSubmit();}}
        >
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