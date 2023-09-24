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

// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
// const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
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
      { element: <DashBoardPage />, index: true },
      { path: 'reserve', element: <PageReserve /> },
      { path: 'list', element: <UserListPage /> },
      {
        path: 'management',
        children: [
          { element: <PageManageSpace />, index: true },
          { path: 'manageUser', element: <PageManageUser /> },
          { path: 'manageSite', element: <PageManageSite /> },
        ],
      },
      // {
      //   path: 'user',
      //   children: [
      //     { element: <UserProfilePage />, index: true },
      //     { path: 'profile', element: <UserProfilePage /> },
      //     { path: 'cards', element: <UserCardsPage /> },
      //     { path: 'list', element: <UserListPage /> },
      //     { path: 'new', element: <UserCreatePage /> },
      //     // { path: ':id/edit', element: <UserEditPage /> },
      //     // { path: 'account', element: <UserAccountPage /> },
      //   ],
      // },
    ],
  },
];
