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
  onPrevClick: () => void;
  selectedData: {
    date: Date | null;
    availableStart: Date | null;
    availableEnd: Date | null;
    personnele: number | null; // 예상되는 데이터 타입에 따라 수정
    space: string | null; // 예상되는 데이터 타입에 따라 수정
  };
}

export default function ReserveForm2({ onPrevClick, selectedData }: ReserveForm2Props) {  
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
    <p>예약 날짜: {selectedData.date ? selectedData.date.toLocaleString() : '날짜가 선택되지 않았습니다.'}</p>
    <p>예약 시작 시간: {selectedData.availableStart ? selectedData.availableStart.toLocaleString() : '시간이 선택되지 않았습니다.'}</p>
    <p>예약 끝 시간: {selectedData.availableEnd ? selectedData.availableEnd.toLocaleString() : '시간이 선택되지 않았습니다.'}</p>
    <p>선택한 수용 인원: {selectedData.personnele}명 이상</p>
    <p>선택한 이용 공간: {selectedData.space || '공간이 선택되지 않았습니다.'}</p>
      <RHFTextField name="grouping" label="모임명" />
      <RHFTextField name="purpose" label="목적" />
      <RHFTextField name="phonenumber" label="연락처" />
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