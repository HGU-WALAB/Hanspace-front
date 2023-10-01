import { Helmet } from 'react-helmet-async';
// sections
import ManageSpaceView from 'src/sections/manageSpace/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Four</title>
      </Helmet>

      <ManageSpaceView />
    </>
  );
}
