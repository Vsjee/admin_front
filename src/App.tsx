import 'animate.css';
import { Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { NotFoundRoute } from './utils';
import DashboardRootLayout from './modules/dashboard/DashboardRootLayout';
import { publicRoutes } from './core/models';

const Login = lazy(() => import('./modules/login/Login'));

function App() {
  return (
    <section>
      <Suspense fallback={<h1>...loading</h1>}>
        <NotFoundRoute>
          <Route path={publicRoutes.LOGIN} element={<Login />} />

          <Route
            path={publicRoutes.DASHBOARD_HOME}
            element={<DashboardRootLayout />}
          />
        </NotFoundRoute>
      </Suspense>
    </section>
  );
}
export default App;
