import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { tokenProvider } from '../../api';

const Authenticated = () => {
  const token = tokenProvider.getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <Outlet />
  );
}

export default Authenticated;
