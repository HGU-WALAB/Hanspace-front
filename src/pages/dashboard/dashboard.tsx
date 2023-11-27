import { Helmet } from 'react-helmet-async';
// sections
import AdminDashboardView from 'src/sections/dashboard/admin-view';
import UserDashboardView from 'src/sections/dashboard/user-view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> HANSPACE: 대시보드 </title>
      </Helmet>

      <AdminDashboardView />
      {/* <UserDashboardView /> */}
    </>
  );
}
