import { Navigate, useRoutes } from 'react-router-dom';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    },

    // Auth routes
    ...authRoutes,

    // Main routes
    ...mainRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/hanspace/404" replace /> },
  ]);
}

// import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
// import { useRecoilValue } from 'recoil'; // Recoil을 사용하는 경우

// import { IsLoginState } from 'src/utils/atom';
// import { mainRoutes } from './main';
// import { authRoutes } from './auth';
// import { dashboardRoutes } from './dashboard';

// export default function Router() {
//   const isUserLoggedIn = useRecoilValue(IsLoginState);

//   const routes: RouteObject[] = isUserLoggedIn
//     ? [...authRoutes, ...mainRoutes, ...dashboardRoutes]
//     : [{ path: '/', element: <Navigate to="/" replace /> }];

//   routes.push({ path: '*', element: <Navigate to="/hanspace/404" replace /> });

//   return useRoutes(routes);
// }
