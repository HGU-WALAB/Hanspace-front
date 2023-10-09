// react
import { useState } from "react";
// @mui
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// components
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import FormProvider , {
  RHFEditor,
  RHFSelect,
  RHFUpload,
  RHFSwitch,
  RHFSlider,
  RHFCheckbox,
  RHFTextField,
  RHFRadioGroup,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';


// ———————————————————————————————————
export const defaultValues = {
  deptId: 0,
  name: '',
  headCount: 0,
  availableStart: '',
  availableEnd: '',
  detail: '',
  availability: true,
  // image: 'https://m.s1campus.co.kr:1543/comm/images/facility/b_lecture1.jpg',
  //
};
interface ReserveForm2Props {
  onPrevClick: () => void; // Specify the type of onNextClick as a function with no arguments
}

export default function ReserveForm2({ onPrevClick }: ReserveForm2Props) {  
    const methods = useForm({
      defaultValues
    });
  
    const {
      // watch,
      // reset,
      // control,
      setValue,
      // handleSubmit,
      formState: { isSubmitting },
    } = methods;

    const handlePrevClick = () => {
      // 이전 페이지로 이동
      onPrevClick();
    };

    const [fields, setFields] = useState([""]);

    const handleAddField = () => {
      setFields([...fields, ""]);
    };
  
    const handleRemoveField = (index: number) => {
      const filteredFields = fields.filter((_, i) => i !== index);
      setFields(filteredFields);
    };
  return (
    <>
    <FormProvider methods={methods}>
      <p>장소</p>
      <p>예약 날짜</p>
      <p>신청인</p>
      <p>시작 시간</p>
      <p>끝 시간</p>
      <RHFTextField name="name" label="모임명" />
      <RHFTextField name="name" label="목적" />
      <RHFTextField name="name" label="연락처" />
      <p>추가 정보</p>
        {fields.map((field, index) => (
          <div key={index}>
            <TextField
              value={field}
              onChange={(e) => {
                const updatedFields = [...fields];
                updatedFields[index] = e.target.value;
                setFields(updatedFields);
              }}
            />
            <IconButton onClick={() => handleRemoveField(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button variant="contained" onClick={handleAddField} sx={{ mt: 2 }}>
          정보 추가하기
        </Button>
      <div style={{ marginTop: '100px' }}>
      <Button onClick={handlePrevClick} variant="outlined" color="inherit">
        이전
      </Button>
      <Button variant="contained">
        예약하기
      </Button>
      </div>
    </FormProvider>
    </>
  );
}