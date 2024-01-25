import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RowRadioButtonsGroup({
  selectedValue,
  onValueChange,
}: {
  selectedValue: string;
  onValueChange: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onValueChange(newValue); // 선택한 값을 부모 컴포넌트로 전달
  };
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ marginLeft: '10px', paddingTop: '16px' }}
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel value="daily" control={<Radio />} label="일일 대여" />
        <FormControlLabel value="regularly" control={<Radio />} label="정기 대여" />
        <FormControlLabel value="csv" control={<Radio />} label="CSV 파일 업로드" />
      </RadioGroup>
    </FormControl>
  );
}
