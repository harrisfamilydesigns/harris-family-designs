import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FullPageSpinner from '../shared/FullPageSpinner';
import SearchParamsAlert from '../shared/SearchParamsAlert';
import logo from '../../assets/secondhand-logo.webp';
import { useCurrentUser, useThrifter } from '../../api';
import { AppstoreOutlined, DashboardOutlined, ShoppingCartOutlined, SolutionOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const ThrifterDashboardPage = lazy(() => import('./ThrifterPages/ThrifterDashboardPage'));
const ThrifterOrdersPage = lazy(() => import('./ThrifterPages/ThrifterOrdersPage'));
const ThrifterInventoryPage = lazy(() => import('./ThrifterPages/ThrifterInventoryPage'));
const ThrifterCustomersPage = lazy(() => import('./ThrifterPages/ThrifterCustomersPage'));
const UserDashboardPage = lazy(() => import('./UserDashboardPage'));
const LoginPage = lazy(() => import('../shared/LoginPage'));
const RegisterPage = lazy(() => import('../shared/RegisterPage'));
const AppLayout = lazy(() => import('../shared/AppLayout'));
const AccountPage = lazy(() => import('./AccountPage'));
const Authenticated = lazy(() => import('../shared/Authenticated'));
const NotAuthenticated = lazy(() => import('../shared/NotAuthenticated'));
const ThrifterOnboarding = lazy(() => import('./ThrifterOnboarding/ThrifterOnboarding'));
const CustomerOnboarding = lazy(() => import('./CustomerOnboarding/CustomerOnboarding'));

const Root = () => {
  const { currentUser } = useCurrentUser();
  const { thrifter } = currentUser?.thrifterId ? useThrifter(currentUser.thrifterId) : { thrifter: null };
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const thrifterMenuItems = thrifter && thrifter.status === 'active' ? [
    {
      key: 'thrifter',
      icon: 'user',
      label: !collapsed && 'Thrifter',
      type: 'group',
      children: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          icon: <DashboardOutlined />,
          onClick: () => navigate('/thrifter/dashboard'),
        },
        {
          key: 'orders',
          label: 'Orders',
          icon: <ShoppingCartOutlined />,
          onClick: () => navigate('/thrifter/orders'),
        },
        {
          key: 'inventory',
          label: 'Inventory',
          icon: <AppstoreOutlined />,
          onClick: () => navigate('/thrifter/inventory'),
        },
        {
          key: 'customers',
          label: 'My Customers',
          icon: <UsergroupAddOutlined />,
          onClick: () => navigate('/thrifter/customers'),
        },
      ]
    }
  ] : [
    {
      key: 'thrifter',
      icon: 'user',
      label: !collapsed && 'Thrifter',
      type: 'group',
      children: [
        {
          key: 'thrifter/onboarding',
          label: 'Thrift with us!',
          icon: <SolutionOutlined />,
          onClick: () => navigate('/thrifter/onboarding'),
        },
      ]
    },
  ];

  const siderMenuItems = [
    {
      key: 'customer',
      icon: 'user',
      label: !collapsed && 'Customer',
      type: 'group',
      children: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          icon: <DashboardOutlined />,
          onClick: () => navigate('/'),
        },
        // {
        //   key: 'orders',
        //   label: 'Orders',
        //   icon: <ShoppingCartOutlined />,
        //   onClick: () => navigate('/orders'),
        // },
        // {
        //   key: 'subscription',
        //   label: 'Subscription',
        //   icon: <DollarCircleOutlined />,
        //   onClick: () => navigate('/subscription'),
        // },
        // {
        //   key: 'thrifters',
        //   label: 'My Thrifters',
        //   icon: <TeamOutlined />,
        //   onClick: () => navigate('/thrifters'),
        // },
      ]
    },
    ...thrifterMenuItems
  ]

  return (
    <Suspense fallback={<FullPageSpinner />}> {/* Provide a fallback here */}
      <SearchParamsAlert />
      <Routes>
        <Route path="/" element={<AppLayout
          siderMenuItems={siderMenuItems}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          title='2ndHandFix'
          logo={logo}
          footerLabel={`2ndHandFix ©${new Date().getFullYear()} Created by You`}
        />}>
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
