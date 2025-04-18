import React from 'react'
import { useCurrentUser } from '../../api';
import LoggedInLayout from './LoggedInLayout/LoggedInLayout';
import LoggedOutLayout from './LoggedOutLayout';

const AppLayout = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return null;

  return currentUser ? <LoggedInLayout /> : <LoggedOutLayout />;
}

export default AppLayout;
