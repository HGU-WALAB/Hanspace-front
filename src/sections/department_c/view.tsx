// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import DepartmentForm from './dept-form';

export default function DepartmentView() {

  return (
    <>
    <Typography variant="h5"> 기관 추가하기 </Typography>
    {/* <Box
        sx={{
          mt: 5,
          width: 0.5,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          // border: (theme) => `dashed 1px ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      > */}
        <DepartmentForm />
      {/* </Box> */}
    </>
  );

}
