// react
import { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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


const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
`;
// ———————————————————————————————————
export const defaultValues = {
    siteName: 'Computer Science', 
    deptName: '전산전자공학부',
    logo: '',
    color: 'red',
    userAccept: true,
    maxRserveCount: 5,
    link: '/Computer Science',
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

    const updateExtraInfo = (newExtraInfo: string) => {
        setExtraInfo(newExtraInfo);
    }
    // const handleMaxRserveCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const numericValue = event.target.value.replace(/\D/g, ''); // 숫자만
    //     const parsedValue = parseInt(numericValue, 10); // Convert to number
    //     setMaxRserveCount(parsedValue);
    // };

    const onSubmit = handleSubmit(async (data) => {
        try {
            data.maxRserveCount = maxRserveCount;
            data.extraInfo = extraInfo;
            reset();
            console.log('넘어오는 data', data);
        } catch (error) {
            console.error(error);
        }
      });

      const handleDropSingleFile = useCallback(
        (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
      
          if (file) {
            setValue('logo', file.name, { shouldValidate: true });
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
    <FormProvider methods={methods} onSubmit={onSubmit}>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>사이트 이름 *</Typography>
            <RHFTextField name="siteName" label="설정된 사이트 이름" sx={{ width: '280px'}}/>
        </Div>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>기관 이름 *</Typography>
            <RHFTextField name="deptName" label="설정된 기관 이름" sx={{ width: '280px'}}/>
        </Div>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 , mr: 4 }}>로고 사진 *</Typography>
            <Typography variant="body2">{logoImageName}</Typography>
            <RHFUploadBox
              name="singleUpload"
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('logo', '', { shouldValidate: true })}
            />
        </Div>  
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>기관 URL *</Typography>
            <RHFTextField name="link" label="설정된 기관 URL" sx={{ width: '280px'}} disabled/>
        </Div>
        {/* <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>테마 색상 *</Typography>
            <FormControl>
            <RHFSelect
                name="color"
                label="테마 색상"
                sx={{ width: '280px' }}
            >
                <MenuItem value="yellow">노란색</MenuItem>
                <MenuItem value="red">빨간색</MenuItem>
                <MenuItem value="black">검정색</MenuItem>
            </RHFSelect>
            </FormControl>
        </Div> */}
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>사용자 즉시 입장 여부 *</Typography>
            <FormControlLabel 
                control={ <RHFSwitch name="userAccept" label={null} sx={{ m: 0 }} />}
                label="허가없이 사용자 기관 가입"
                sx={{mr: 2}}
            />
        </Div>
        <Div>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>사용자 최대 예약 가능 날짜 *</Typography>
            <RHFTextField 
              name="maxRserveCount" 
              label="최대 예약 가능 날짜를 설정해주세요" 
              sx={{ width: '280px'}} 
              type="number"
              onChange={(newValue) => {
                const numericValue = parseFloat(newValue.target.value);
                setMaxRserveCount(numericValue);
              }}
              value={maxRserveCount}
            />
        </Div>
        {/* <Div>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 4 }}>추가 정보</Typography>
          <DynamicTextField onUpdateExtraInfo={updateExtraInfo}/>
        </Div> */}
    </FormProvider>
    </Box>
    <Box        
      sx={{
      mt: 10,
      width: 0.5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}> 
    {logoImagePreview ? 
      (<Image src={logoImagePreview} alt="Selected Logo" sx={{ borderRadius: 1, height: '400px', width: '60%' }} />)
    :
      (<Image src='https://source.unsplash.com/random' alt="Selected Logo" sx={{ borderRadius: 1, height: '400px', width: '60%' }} />)
    }
      <Button variant="outlined" color="primary" onClick={() => {onSubmit();}} sx={{ width: '350px', mt: 5 }}>
        수정하기
      </Button>
    </Box>
    </Div>
  );
}
