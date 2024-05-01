import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../../components';
import Sidebar from './components/Sidebar';
import DashboardHome from './DashboardHome';
import { publicRoutes } from '../../models';
import Profile from '../adminProfile/AdminProfile';
import AnalyticsUsers from '../dashboardGraphs/analyticsUsers/AnalyticsUsers';
import AnalyticsKids from '../dashboardGraphs/analyticsKids/AnalyticsKids';
import AnalitycsBooks from '../dashboardGraphs/analyticsBooks/AnalitycsBooks';

function DashboardRootLayout() {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Page content */}
        <div className="drawer-content pt-10">
          <Routes>
            <Route path="" element={<DashboardHome />} />
            <Route
              path={publicRoutes.ANALYTICS_USERS}
              element={<AnalyticsUsers />}
            />
            <Route
              path={publicRoutes.ANALYTICS_KIDS}
              element={<AnalyticsKids />}
            />
            <Route
              path={publicRoutes.ANALYTICS_BOOKS}
              element={<AnalitycsBooks />}
            />
            <Route path={publicRoutes.ADMIN_PROFILE} element={<Profile />} />
          </Routes>
        </div>

        {/* Drawer content */}
        <Sidebar />
      </div>
    </>
  );
}

export default DashboardRootLayout;
