import 'animate.css';
import { Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { NotFoundRoute } from './utils';
import { publicRoutes } from './models';
import DashboardRootLayout from './modules/dashboard/DashboardRootLayout';

const Login = lazy(() => import('./modules/login/Login'));
const DashboardHome = lazy(() => import('./modules/dashboard/DashboardHome'));

function App() {
  return (
    <section>
      <Suspense fallback={<h1>...loading</h1>}>
        <NotFoundRoute>
          <Route path={publicRoutes.LOGIN} element={<Login />} />

          <Route
            path={publicRoutes.DASHBOARD_HOME}
            element={
              <DashboardRootLayout>
                <DashboardHome />
              </DashboardRootLayout>
            }
          />
        </NotFoundRoute>
      </Suspense>
    </section>
  );
}
export default App;
