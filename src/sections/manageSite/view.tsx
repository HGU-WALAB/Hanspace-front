// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import DepartmentInfoForm from './dept-info';

// ----------------------------------------------------------------------

export default function ManageSiteView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        기관 정보 관리하기
      </Typography>
      <DepartmentInfoForm />
    </Container>
  );
}
