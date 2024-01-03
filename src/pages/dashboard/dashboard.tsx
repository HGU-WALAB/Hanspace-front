import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
// sections
import AdminDashboardView from 'src/sections/dashboard/admin-view';
import UserDashboardView from 'src/sections/dashboard/user-view';
import { userDeptState } from 'src/utils/atom';
// ----------------------------------------------------------------------

export default function Page() {
  const userDeptInfo = useRecoilValue(userDeptState);
  return (
    <>
      <Helmet>
        <title> HANSPACE: 대시보드 </title>
      </Helmet>

      {typeof userDeptInfo === 'object' &&
      userDeptInfo.deptMemberResponse[0].deptRole === 'Admin' ? (
        <AdminDashboardView />
      ) : (
        <UserDashboardView />
      )}
    </>
  );
}
