import { User } from '@auth0/auth0-react';
import { Helmet } from 'react-helmet-async';
// sections
import AdminDashboardView from 'src/sections/dashboard/admin-view';
import UserDashboardView from 'src/sections/dashboard/user-view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      {/* <AdminDashboardView /> */}
      <UserDashboardView />
    </>
  );
}
