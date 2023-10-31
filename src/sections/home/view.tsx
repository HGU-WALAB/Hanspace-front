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
import DeptHeaderButton from './dept-button';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();
  const setUrl = useSetRecoilState(DeptNameState);
  setUrl('CSEE');
  const url = 'CSEE';

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> HOME </Typography>

      <Button>
        <Link href={paths.dept.dashboard(url)} color="inherit">
          dashboard
        </Link>
      </Button>

      <DeptHeaderButton />
    </Container>
  );
}
