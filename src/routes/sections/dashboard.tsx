import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const DashBoardPage = lazy(() => import('src/pages/dashboard/dashboard'));
const PageReserve = lazy(() => import('src/pages/dashboard/reserve'));
const PageReserveList = lazy(() => import('src/pages/dashboard/manage-reserve-list'));
const PageManageSpace = lazy(() => import('src/pages/dashboard/manage-space'));
const PageUserList = lazy(() => import('src/pages/dashboard/manage-user-list'));
const PageManageSite = lazy(() => import('src/pages/dashboard/manage-dept'));
const AddDepartmentView = lazy(() => import('src/pages/dashboard/add-department'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'hanspace',
    element: (
      // <AuthGuard>
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
      // </AuthGuard>
    ),
    children: [
      { path: ':url/dashboard', element: <DashBoardPage /> },
      { path: ':url/reserve', element: <PageReserve /> },
      { path: ':url/reservelist', element: <PageReserveList /> },
      {
        path: ':url/management',
        children: [
          { element: <PageManageSpace />, index: true },
          { path: 'manageUser', element: <PageUserList /> },
          { path: 'manageSite', element: <PageManageSite /> },
        ],
      },
      {
        path: 'department',
        element: <AddDepartmentView />,
      },
      // {
      //   path: 'user',
      //   children: [
      //     { element: <UserProfilePage />, index: true },
      //     { path: 'profile', element: <UserProfilePage /> },
      //     { path: 'cards', element: <UserCardsPage /> },
      //     { path: 'list', element: <UserListPage /> },
      //     { path: 'new', element: <UserCreatePage /> },
      // { path: ':id/edit', element: <UserEditPage /> },
      //     // { path: 'account', element: <UserAccountPage /> },
      //   ],
      // },
      // {
      //   path: 'order',
      //   children: [
      //     { element: <OrderListPage />, index: true },
      //     { path: 'list', element: <OrderListPage /> },
      //     // { path: ':id', element: <OrderDetailsPage /> },
      //   ],
      // },
    ],
  },
];
