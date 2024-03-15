import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Authenticated from './Authenticated';
import NotAuthenticated from './NotAuthenticated';
import FullPageSpinner from '../shared/FullPageSpinner';
import AccountPage from './AccountPage';

const UserDashboardPage = lazy(() => import('./UserDashboardPage'));

const Root = () => {
  return (
    <Suspense fallback={<FullPageSpinner />}> {/* Provide a fallback here */}
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Authenticated />}>
            <Route index element={<UserDashboardPage />} /> {/* This will be lazily loaded */}
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
