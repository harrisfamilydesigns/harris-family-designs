import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { tokenProvider } from '../../api';

const NotAuthenticated = () => {
  const token = tokenProvider.getToken();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Outlet />
  );
}

export default NotAuthenticated;
