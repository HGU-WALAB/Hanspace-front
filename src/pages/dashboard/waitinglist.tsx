import { Helmet } from 'react-helmet-async';
// sections
// import WaitingListView from 'src/sections/waitinglist/view';
// import { UserListView } from 'src/sections/user/view';
import WaitingListView from 'src/sections/waitinglist/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> WaitingList </title>
      </Helmet>

      <WaitingListView />
      {/* <UserListView /> */}
    </>
  );
}
