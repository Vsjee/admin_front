import { Routes, Route, useNavigate } from 'react-router-dom';

import { Navbar } from '../../components';
import Sidebar from './components/Sidebar';
import DashboardHome from './DashboardHome';
import Profile from '../adminProfile/AdminProfile';

import { publicRoutes } from '../../core/models';
import AnalyticsKids from '../dashboardAnalytics/analyticsKids/AnalyticsKids';
import AnalyticsUsers from '../dashboardAnalytics/analyticsUsers/AnalyticsUsers';
import UsersDetail from '../dashboardAnalytics/analyticsUsers/pages/UsersDetail';
import UserKidsDetail from '../dashboardAnalytics/analyticsUsers/pages/UserKidsDetail';
import UserBooksDetail from '../dashboardAnalytics/analyticsUsers/pages/UserBooksDetail';
import { useEffect } from 'react';
import { useAuthStore } from '../../zustand/authStore';

function DashboardRootLayout() {
  const navigate = useNavigate();

  const getAuth = useAuthStore((state) => state.auth);

  useEffect(() => {
    if (!getAuth) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Page content */}
        <div className="drawer-content lg:pt-0 pt-10">
          <Routes>
            {/* DASHBOARD */}
            <Route path="" element={<DashboardHome />} />

            {/* USERS */}
            <Route
              path={publicRoutes.ANALYTICS_USERS}
              element={<AnalyticsUsers />}></Route>
            <Route
              path={publicRoutes.ANALYTICS_USERS_DETAILS}
              element={<UsersDetail />}
            />
            <Route
              path={publicRoutes.ANALYTICS_USERS_KIDS_DETAILS}
              element={<UserKidsDetail />}
            />
            <Route
              path={publicRoutes.ANALYTICS_USERS_BOOKS_DETAILS}
              element={<UserBooksDetail />}
            />

            {/* KIDS */}
            <Route
              path={publicRoutes.ANALYTICS_KIDS}
              element={<AnalyticsKids />}
            />

            {/* PROFILE */}
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
