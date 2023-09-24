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
      { path: 'waitinglist', element: <PageWaitinglist /> },
      {
        path: 'management',
        children: [
          { element: <PageManageSpace />, index: true },
          { path: 'manageUser', element: <PageManageUser /> },
          { path: 'manageSite', element: <PageManageSite /> },
        ],
      },
    ],
  },
];
