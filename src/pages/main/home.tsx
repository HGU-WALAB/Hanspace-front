import { Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Link from '@mui/material/Link';
import { useSetRecoilState } from 'recoil';
import { paths } from 'src/routes/paths';
// sections
import { DeptNameState } from 'src/stores/atom';

// ----------------------------------------------------------------------

export default function Page() {
  const setUrl = useSetRecoilState(DeptNameState);
  setUrl('CSEE');
  const url = 'CSEE';
  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      {/* <DashboardView /> */}
      <Button>
        <Link href={paths.dept.dashboard(url)} color="inherit">
          dashboard
        </Link>
      </Button>
    </>
  );
}
