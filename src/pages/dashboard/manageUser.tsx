import { Helmet } from 'react-helmet-async';
// sections
import ManageUserView from 'src/sections/manageUser/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: manageUser</title>
      </Helmet>

      <ManageUserView />
    </>
  );
}
