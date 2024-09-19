import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../api';

const Authenticated = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return null;

  if (!currentUser) {
    return <Navigate to="login" replace />;
  }

  return (
    <Outlet />
  );
}

export default Authenticated;
