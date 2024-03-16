import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FullPageSpinner from '../shared/FullPageSpinner';

const UserDashboardPage = lazy(() => import('./UserDashboardPage'));
const LoginPage = lazy(() => import('./LoginPage'));
const RegisterPage = lazy(() => import('./RegisterPage'));
const AppLayout = lazy(() => import('./AppLayout'));
const AccountPage = lazy(() => import('./AccountPage'));
const Authenticated = lazy(() => import('./Authenticated'));
const NotAuthenticated = lazy(() => import('./NotAuthenticated'));

const Root = () => {
  return (
    <Suspense fallback={<FullPageSpinner />}> {/* Provide a fallback here */}
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Authenticated />}>
            <Route index element={<UserDashboardPage />} />
            <Route path="account" element={<AccountPage/>} />
          </Route>

          <Route path="login" element={<NotAuthenticated/>}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="register" element={<NotAuthenticated />}>
            <Route index element={<RegisterPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default Root;
