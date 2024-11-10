import { useRoutes } from 'react-router-dom';
import Main from './Main/Main';
import { Auth0Provider } from '@auth0/auth0-react';
import Dashboard from './Dashboard/Dashboard';
import DashboardWelcome from './Dashboard/DashboardWelcome/DashboardWelcome';

const routes = [
  { root: '/', children: [
    { index: true, element: <Main /> },
    { path: 'dashboard/*', element: <Dashboard />, children: [
      { index: true, element: <DashboardWelcome /> }
    ]}
  ] },
];

const BookingApp = () => {
  return (
    <Auth0Provider
      domain="dev-cf7ypq2110vm82oe.us.auth0.com"
      clientId="7HVl4DJk6OAGFPqL4G6pv2lYvdAajKuS"
      authorizationParams={{
        redirect_uri: window.location.origin + '/booksuite/dashboard',
      }}
    >
      {useRoutes(routes)}
    </Auth0Provider>
  )
}

export default BookingApp;
