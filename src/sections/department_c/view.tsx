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
      <Typography variant="h4"         
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      > 
        기관 추가하기 
      </Typography>
      <DepartmentForm />
    </Container>
  );

}
