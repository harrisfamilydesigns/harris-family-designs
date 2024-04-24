import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FullPageSpinner from '../shared/FullPageSpinner';
import SearchParamsAlert from '../shared/SearchParamsAlert';

const ThrifterDashboardPage = lazy(() => import('./ThrifterPages/ThrifterDashboardPage'));
const ThrifterOrdersPage = lazy(() => import('./ThrifterPages/ThrifterOrdersPage'));
const ThrifterInventoryPage = lazy(() => import('./ThrifterPages/ThrifterInventoryPage'));
const ThrifterCustomersPage = lazy(() => import('./ThrifterPages/ThrifterCustomersPage'));
const UserDashboardPage = lazy(() => import('./UserDashboardPage'));
const LoginPage = lazy(() => import('./LoginPage'));
const RegisterPage = lazy(() => import('./RegisterPage'));
const AppLayout = lazy(() => import('./AppLayout'));
const AccountPage = lazy(() => import('./AccountPage'));
const Authenticated = lazy(() => import('./Authenticated'));
const NotAuthenticated = lazy(() => import('./NotAuthenticated'));
const ThrifterOnboarding = lazy(() => import('./ThrifterOnboarding/ThrifterOnboarding'));
const CustomerOnboarding = lazy(() => import('./CustomerOnboarding/CustomerOnboarding'));

const Root = () => {
  return (
    <Suspense fallback={<FullPageSpinner />}> {/* Provide a fallback here */}
      <SearchParamsAlert />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Authenticated />}>
            <Route index element={<UserDashboardPage />} />
            <Route path="account" element={<AccountPage/>} />
            <Route path="customer/onboarding/*" element={<CustomerOnboarding />} />
            <Route path="thrifter">
              <Route path="dashboard" element={<ThrifterDashboardPage />} />
              <Route path="orders" element={<ThrifterOrdersPage />} />
              <Route path="inventory" element={<ThrifterInventoryPage />} />
              <Route path="customers" element={<ThrifterCustomersPage />} />
              <Route path="onboarding/*" element={<ThrifterOnboarding />} />
            </Route>
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
