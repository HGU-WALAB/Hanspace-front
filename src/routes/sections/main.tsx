import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import CompactLayout from 'src/layouts/compact';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/main/home'));
const Page404 = lazy(() => import('src/pages/404'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    path: 'hanspace',
    element: (
      <AuthGuard>
        <CompactLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </CompactLayout>
      </AuthGuard>
    ),
    children: [
      { element: <HomePage />, index: true },
      { path: '404', element: <Page404 /> },
    ],
  },
];
