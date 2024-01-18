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
            <Typography variant="h4"         
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
