import { Helmet } from 'react-helmet-async';
// sections
import ManageSiteView from 'src/sections/manageSite/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> HANSPACE: 기관 관리 </title>
      </Helmet>

      <ManageSiteView />
    </>
  );
}
