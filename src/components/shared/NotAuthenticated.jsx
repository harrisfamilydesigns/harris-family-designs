import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../api';

const NotAuthenticated = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Outlet />
  );
}

export default NotAuthenticated;
