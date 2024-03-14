import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const NotAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Outlet />
  );
}

export default NotAuthenticated;
