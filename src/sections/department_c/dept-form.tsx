// react
import { SetStateAction, useCallback, useState } from "react";
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
import DynamicTextField from "../reserve/dynamic-textfield";
import DeptPopover from "./dept-popover";
import DepartmentCreateSuccessModal from "./dept-modal";

// ———————————————————————————————————
export const defaultValues = {
    siteName: '', 
    deptName: '',
    logo: '',
    color: '',
    userAccept: false,
    maxRserveCount: 0,
    link: '',
    extraInfo: '',
    // siteInfoTitle: '',
    // siteInfoDetail: '',
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
    const [maxRserveCount, setMaxRserveCount] = useState(30);
    const [extraInfo, setExtraInfo] = useState('');
    const [open, setOpen] = useState<boolean>(false);

    const updateExtraInfo = (newExtraInfo: string) => {
        setExtraInfo(newExtraInfo);
    }
    const handleMaxRserveCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/\D/g, ''); // 숫자만
        const parsedValue = parseInt(numericValue, 10); // Convert to number
        setMaxRserveCount(parsedValue);
    };

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
            setValue('logo', file.name, { shouldValidate: true });
            setLogoImageName(file.name);
          }
        },
        [setValue]
      );

  return (
    <Box>
    <DepartmentCreateSuccessModal open={open} onClose={() => setOpen(false)} />
    <FormProvider methods={methods} onSubmit={onSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, width: '300px' }}>사이트 이름 *</Typography>
            <RHFTextField name="siteName" label="사이트 이름을 입력해주세요." sx={{ width: '280px'}}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, width: '300px' }}>기관 이름 *</Typography>
            <RHFTextField name="deptName" label="기관 이름을 입력해주세요." sx={{ width: '280px'}}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, width: '300px' }}>로고 사진 *</Typography>
            <Typography variant="body2">{logoImageName}</Typography>
            <RHFUploadBox
              name="singleUpload"
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('logo', '', { shouldValidate: true })}
            />
        </div>  
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, width: '300px' }}>테마 색상 *</Typography>
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 20px 0'}}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, width: '300px' }}>사용자 즉시 입장 여부 *</Typography>
            <FormControlLabel 
                control={ <RHFSwitch name="userAccept" label={null} sx={{ m: 0 }} />}
                label="허가없이 사용자 기관 가입"
                sx={{mr: 2}}
            />
            <DeptPopover filed="userAccept"/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 20px 0'}}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, width: '300px' }}>사용자 최대 예약 가능 날짜 *</Typography>
            <RHFTextField name="maxRserveCount" label="사용자 최대 예약 가능 날짜를 입력해주세요." sx={{ width: '280px'}} value={maxRserveCount} onChange={handleMaxRserveCountChange} />
            {/* <DeptPopover filed="maxRserveCount"/> */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 20px 0'}}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, width: '300px' }}>URL 이름 *</Typography>
            <RHFTextField name="link" label="URL 이름을 입력해주세요." sx={{ width: '280px'}}/>
            {/* url 중복 체크하기 */}
        </div>
        <Typography variant="subtitle1" sx={{ flexGrow: 1, width: '300px' }}>추가 정보</Typography>
        <DynamicTextField onUpdateExtraInfo={updateExtraInfo}/>

        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="primary" onClick={() => {onSubmit();}} sx={{ width: '100px', marginTop: '50px' }}>
                대여하기
            </Button>
        </Box>
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