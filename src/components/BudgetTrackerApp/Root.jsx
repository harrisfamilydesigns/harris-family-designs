import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FullPageSpinner from '../shared/FullPageSpinner';
import SearchParamsAlert from '../shared/SearchParamsAlert';
import AppLayout from '../shared/AppLayout';
import Authenticated from '../shared/Authenticated';
import NotAuthenticated from '../shared/NotAuthenticated';
import LoginPage from '../shared/LoginPage';
import RegisterPage from '../shared/RegisterPage';
import BudgetDashboardPage from './BudgetDashboardPage';

const Root = () => (
  <Suspense fallback={<FullPageSpinner />}>
    <SearchParamsAlert />
    <Routes>
      <Route path="/" element={<AppLayout title={'BudgetTracker'} logo={null} footerLabel={`BudgetTracker ©${new Date().getFullYear()}`}/>}>
        <Route path="/" element={<Authenticated />}>
          <Route index element={<BudgetDashboardPage />} />
        </Route>
        <Route path="login" element={<NotAuthenticated />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="register" element={<NotAuthenticated />}>
          <Route index element={<RegisterPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Suspense>
)

export default Root;
