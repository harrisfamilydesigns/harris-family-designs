import React from 'react'
import { useCurrentUser } from '../../api';
import LoggedInLayout from './LoggedInLayout/LoggedInLayout';
import LoggedOutLayout from './LoggedOutLayout';

const AppLayout = ({ ...props }) => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return null;

  return currentUser ?
    <LoggedInLayout {...props} /> :
    <LoggedOutLayout {...props} />;
}

export default AppLayout;
