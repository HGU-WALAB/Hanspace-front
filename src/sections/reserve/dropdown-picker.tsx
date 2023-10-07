import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DropDownSelect() {
  const [personnele, setPersonnel] = React.useState('');
  const [space, setSpace] = React.useState('');

  const handlePersonneleChange = (event: SelectChangeEvent) => {
    setPersonnel(event.target.value as string);
  };
  const handleSpaceChange = (event: SelectChangeEvent) => {
    setSpace(event.target.value as string);
  };

  return (
    <>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">수용 인원</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={personnele}
          label="Personnele"
          onChange={handlePersonneleChange}
        >
          <MenuItem value={10}>10명 이상</MenuItem>
          <MenuItem value={20}>20명 이상</MenuItem>
          <MenuItem value={30}>30명 이상</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">이용 공간</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={space}
          label="Space"
          onChange={handleSpaceChange}
        >
          <MenuItem value={10}>장소1</MenuItem>
          <MenuItem value={20}>장소2</MenuItem>
          <MenuItem value={30}>장소3</MenuItem>
        </Select>
        </FormControl>
    </Box>
    </>
  );
}
