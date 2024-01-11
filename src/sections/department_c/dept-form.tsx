// react
import { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import { createDept } from 'src/api/deptApi';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from "@mui/material/FormControlLabel";
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
import DeptPopover from "./dept-popover";
import DepartmentCreateSuccessDialog from "./dept-dialog";


const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
`;
// ———————————————————————————————————
export const defaultValues = {
    siteName: '', 
    deptName: '',
    // ToDo: 이미지 중 하나 삭제 필요
    logoImage: '',
    deptImage: '',
    userAccept: false,
    maxRserveCount: 0,
    link: '',
    extraInfo: '',
};

export default function DepartmentForm() {
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
    const [maxRserveCount, setMaxRserveCount] = useState(30);
    const [extraInfo, setExtraInfo] = useState('');
    const [open, setOpen] = useState<boolean>(false);

    const updateExtraInfo = (newExtraInfo: string) => {
        setExtraInfo(newExtraInfo);
    }

    const onSubmit = handleSubmit(async (data) => {
        try {
            data.maxRserveCount = maxRserveCount;
            data.extraInfo = extraInfo;
            data.deptImage = "no";
            createDept(data).then((res) => {
              console.log("저장되는 기관 정보들 확인", res);
            })
            reset();
            setMaxRserveCount(30);
            setExtraInfo('');
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
    <Div>
    <Box        
      sx={{
      mt: 5,
      width: 0.5,
      borderRadius: 2,
      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      // border: (theme) => `dashed 1px ${theme.palette.divider}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}> 
    <DepartmentCreateSuccessDialog open={open} onClose={() => setOpen(false)} />
    <FormProvider methods={methods} onSubmit={onSubmit}>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>사이트 이름 *</Typography>
            <RHFTextField name="siteName" label="사이트 이름을 입력해주세요." sx={{ width: '280px'}}/>
        </Div>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>기관 이름 *</Typography>
            <RHFTextField name="deptName" label="기관 이름을 입력해주세요." sx={{ width: '280px'}}/>
        </Div>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 , mr: 4 }}>로고 사진 *</Typography>
            <Typography variant="body2">{logoImageName}</Typography>
            <RHFUploadBox
              name="logoImage"
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('logoImage', '', { shouldValidate: true })}
            />
        </Div>  
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>사용자 즉시 입장 여부 *</Typography>
            <FormControlLabel 
                control={ <RHFSwitch name="userAccept" label={null} sx={{ m: 0 }} />}
                label="허가없이 사용자 기관 가입"
                sx={{mr: 2}}
            />
            <DeptPopover filed="userAccept"/>
        </Div>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>사용자 최대 예약 가능 날짜 *</Typography>
            <RHFTextField 
              name="maxRserveCount" 
              label="사용자 최대 예약 가능 날짜를 입력해주세요." 
              sx={{ width: '280px'}} 
              type="number" 
              value={maxRserveCount} 
              onChange={(newValue) => {
                const numericValue = parseFloat(newValue.target.value);
                setMaxRserveCount(numericValue);
              }} 
            />
            {/* <DeptPopover filed="maxRserveCount"/> */}
        </Div>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>URL 이름 *</Typography>
            <RHFTextField name="link" label="URL 이름을 입력해주세요." sx={{ width: '280px'}}/>
        </Div>
        <Div>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>추가 정보</Typography>
          <DynamicTextField onUpdateExtraInfo={updateExtraInfo}/>
        </Div>
    </FormProvider>
    </Box>
    <Box        
      sx={{
      mt: 5,
      width: 0.5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}> 
    {logoImagePreview ? 
      (<Image src={logoImagePreview} alt="Selected Logo" sx={{ borderRadius: 1, height: '450px', width: '60%' }} />)
    :
      (<Image src='https://source.unsplash.com/random' alt="Selected Logo" sx={{ borderRadius: 1, height: '450px', width: '60%' }} />)
    }
      <Button variant="outlined" color="primary" onClick={() => {onSubmit();}} sx={{ width: '60%', height: '50px', mt: 5 }}>
        추가하기
      </Button>
    </Box>
    </Div>
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