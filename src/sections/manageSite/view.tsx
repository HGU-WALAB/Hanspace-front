// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// components
import { useSettingsContext } from 'src/components/settings';
import DepartmentInfoForm from './dept-info';

// ----------------------------------------------------------------------

export default function ManageSiteView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 기관 정보 관리하기 </Typography>
      <Link component={RouterLink} href={paths.dashboard.department.root} color="primary" variant="subtitle2" noWrap>
        <Button disableRipple  variant="outlined" color="primary">기관 등록하기</Button>
      </Link>
      <DepartmentInfoForm />
    </Container>
  );
}
