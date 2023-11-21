// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';
// components
import { useSettingsContext } from 'src/components/settings';

import DepartmentForm from './dept-form';

export default function DepartmentView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
    <Typography variant="h4"> 기관 추가하기 </Typography>
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
    </Container>
  );

}
