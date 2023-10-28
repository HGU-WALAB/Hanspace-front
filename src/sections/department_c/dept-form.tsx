// react
import { SetStateAction, useState } from "react";
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
    deptId: 1,
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

  return (
    <Box>
    <DepartmentCreateSuccessModal open={open} onClose={() => setOpen(false)} />
    <FormProvider methods={methods} onSubmit={onSubmit}>
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>사이트 이름 *</Typography>
        <RHFTextField name="siteName" label="사이트 이름을 입력해주세요." sx={{ width: '280px'}}/>

        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>기관 이름 *</Typography>
        <RHFTextField name="deptName" label="기관 이름을 입력해주세요." sx={{ width: '280px'}}/>

        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>로고 사진 *</Typography>
        

        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>테마 색상 *</Typography>
        <FormControl fullWidth>
          <RHFSelect
            name="color"
            label="테마 색상"
            sx={{ width: '280px'}}
          >
            <MenuItem value="yellow">노란색</MenuItem>
            <MenuItem value="red">빨간색</MenuItem>
            <MenuItem value="black">검정색</MenuItem>
          </RHFSelect>
        </FormControl>

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 20px 0'}}>
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>사용자 즉시 입장 여부 *</Typography>
            <DeptPopover filed="userAccept"/>
        </div>
        <FormControlLabel 
            control={ <RHFSwitch name="userAccept" label={null} sx={{ m: 0 }} />}
            label="허가없이 사용자 기관 가입"
        />
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 20px 0'}}>
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>사용자 최대 예약 가능 날짜 *</Typography>
            <DeptPopover filed="maxRserveCount"/>
        </div>
        <RHFTextField name="maxRserveCount" label="사용자 최대 예약 가능 날짜를 입력해주세요." sx={{ width: '280px'}} value={maxRserveCount} onChange={handleMaxRserveCountChange} />

        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>URL 이름 *</Typography>
        <RHFTextField name="link" label="URL 이름을 입력해주세요." sx={{ width: '280px'}}/>

        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>추가 정보</Typography>
        <DynamicTextField onUpdateExtraInfo={updateExtraInfo}/>

        <Button variant="outlined" color="primary" onClick={() => {onSubmit();}} sx={{ width: '100px', marginTop: '10px'}}>
            대여하기
        </Button>
    </FormProvider>
    </Box>
  );
}