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
const PageWaitinglist = lazy(() => import('src/pages/dashboard/waitinglist'));
const PageManageSpace = lazy(() => import('src/pages/dashboard/manageSpace'));
const PageManageUser = lazy(() => import('src/pages/dashboard/manageUser'));
const PageManageSite = lazy(() => import('src/pages/dashboard/manageSite'));
const DepartmentView = lazy(() => import('src/pages/dashboard/department'));

// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
// const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));

// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'hanspace',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { path: ':url/dashboard', element: <DashBoardPage /> },
      { path: ':url/reserve', element: <PageReserve /> },
      // { path: 'waitinglist', element: <PageWaitinglist /> },
      { path: ':url/reservelist', element: <OrderListPage /> },
      {
        path: ':url/management',
        children: [
          { element: <PageManageSpace />, index: true },
          // { path: 'manageUser', element: <PageManageUser /> },
          { path: ':url/manageUser', element: <UserListPage /> },
          { path: ':url/manageSite', element: <PageManageSite /> },
        ],
      },
      {
        path: 'department',
        element: <DepartmentView />,
      }
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
