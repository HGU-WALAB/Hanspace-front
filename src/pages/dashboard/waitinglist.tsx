import { Helmet } from 'react-helmet-async';
// sections
import WaitingListView from 'src/sections/waitinglist/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> WaitingList </title>
      </Helmet>

      <WaitingListView />
    </>
  );
}
