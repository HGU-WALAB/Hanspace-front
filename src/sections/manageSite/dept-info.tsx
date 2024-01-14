// react
import { SetStateAction, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { DeptUrlState, userDeptState } from 'src/utils/atom';
import { readDept, updateDept } from "src/api/deptApi";
import { IDeptRead } from "src/types/dept";
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
  siteName: '', 
  deptName: '',
  deptImage: '',
  userAccept: false,
  maxRserveCount: 0,
  extraInfo: '',
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

    const [eventsData, setEventData] = useState<IDeptRead | null>();
    const [open, setOpen] = useState<boolean>(false);
    const [maxRserveCount, setMaxRserveCount] = useState(defaultValues.maxRserveCount);
    const [extraInfo, setExtraInfo] = useState('');

    const userDeptInfo = useRecoilValue(userDeptState);
    let deptId = '';
    if (typeof userDeptInfo === 'object') {
      deptId = `${userDeptInfo.deptId}`;
    }
    useEffect(() => {
      // ToDo : DeptId 전달 시 해당 기관 정보 받아오는 API
      const fetchData = async () => {
        try {
          const data = await readDept(Number(deptId));
          setEventData(data?.data);
          console.log("data" ,data); // 불러와진 정보 확인하기
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [deptId]);


    const onSubmit = handleSubmit(async (data) => {
        try {
            data.maxRserveCount = maxRserveCount;
            data.extraInfo = extraInfo;
            reset();
            console.log('수정된 기관 data 확인', data);
            await updateDept(data, Number(deptId));
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
            setValue('deptImage', file.name, { shouldValidate: true });
            // setDeptImage(file.name);
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
            value={eventsData?.maxRserveCount} 
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
          name="deptImage"
          onDrop={handleDropSingleFile}
          onDelete={() => setValue('deptImage', '', { shouldValidate: true })}
          helperText = "기관 대표 이미지를 선택해주세요"
        /> 
        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="soft"
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