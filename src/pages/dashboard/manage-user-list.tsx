import { Helmet } from 'react-helmet-async';
// sections
import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> HANSPACE: 사용자 관리 </title>
      </Helmet>

      <UserListView />
    </>
  );
}
