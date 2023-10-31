// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// componentss
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import { useSetRecoilState } from 'recoil';
import { DeptNameState } from 'src/stores/atom';
import DeptList from './dept-list';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();
  const setUrl = useSetRecoilState(DeptNameState);
  setUrl('CSEE');
  const url = 'CSEE';

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
