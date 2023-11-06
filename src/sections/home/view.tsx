// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// componentss
import { useSettingsContext } from 'src/components/settings';
import DeptList from './dept-list';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* <Button>
        <Link href={paths.dept.dashboard(url)} color="inherit">
          dashboard
        </Link>
      </Button> */}

      <Typography variant="h4"> 입장 가능한 기관들 보기 </Typography>
      <DeptList />
    </Container>
  );
}
