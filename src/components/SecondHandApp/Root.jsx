import React from 'react';
import SearchParamsAlert from '../shared/SearchParamsAlert';
import { Navigate, useRoutes } from 'react-router-dom';
import ThrifterDashboardPage from './ThrifterPages/ThrifterDashboardPage';
import ThrifterOrdersPage from './ThrifterPages/ThrifterOrdersPage';
import ThrifterInventoryPage from './ThrifterPages/ThrifterInventoryPage';
import ThrifterCustomersPage from './ThrifterPages/ThrifterCustomersPage';
import UserDashboardPage from './UserDashboardPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AppLayout from './AppLayout';
import AccountPage from './AccountPage';
import Authenticated from './Authenticated';
import ThrifterOnboarding from './ThrifterOnboarding/ThrifterOnboarding';
import CustomerOnboarding from './CustomerOnboarding/CustomerOnboarding';

const Root = () => (
  <>
    <SearchParamsAlert />
    {useRoutes([
      {
        route: '/', element: <AppLayout />, children: [
          { route: '/', element: <Authenticated />, children: [
            { index: true, element: <UserDashboardPage /> },
            { path: 'account', element: <AccountPage /> },
            { path: 'customer/onboarding/*', element: <CustomerOnboarding /> },
            { path: 'thrifter', children: [
              { path: 'dashboard', element: <ThrifterDashboardPage /> },
              { path: 'orders', element: <ThrifterOrdersPage /> },
              { path: 'inventory', element: <ThrifterInventoryPage /> },
              { path: 'customers', element: <ThrifterCustomersPage /> },
              { path: 'onboarding/*', element: <ThrifterOnboarding /> },
            ]},
          ]},
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
          { path: '*', element: <Navigate to="" /> }
        ]
      }
    ])}
  </>
)

export default Root;
