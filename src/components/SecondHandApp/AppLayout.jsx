import React from 'react'
import { tokenProvider } from '../../api';
import LoggedInLayout from './LoggedInLayout';
import LoggedOutLayout from './LoggedOutLayout';
import { useLocation } from 'react-router-dom';

const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    const token = tokenProvider.getToken();
    setIsLoggedIn(!!token);
  }, [location])

  return isLoggedIn ? <LoggedInLayout /> : <LoggedOutLayout />;
}

export default AppLayout;
