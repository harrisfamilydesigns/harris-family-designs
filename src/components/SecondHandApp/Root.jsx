import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Authenticated from './Authenticated';
import NotAuthenticated from './NotAuthenticated';

const UserDashboardPage = lazy(() => import('./UserDashboardPage'));

const Root = () => {
  return (
    <Router >
      <Suspense fallback={<div>Loading...</div>}> {/* Provide a fallback here */}
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Authenticated />}>
              <Route index element={<UserDashboardPage />} /> {/* This will be lazily loaded */}
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
    </Router>
  );
}

export default Root;
