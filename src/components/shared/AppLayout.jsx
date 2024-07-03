import React from 'react'
import { useCurrentUser } from '../../api';
import LoggedInLayout from '../SecondHandApp/LoggedInLayout/LoggedInLayout';
import LoggedOutLayout from './LoggedOutLayout';

const AppLayout = ({ title, logo, footerLabel }) => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return null;

  return currentUser ?
    <LoggedInLayout title={title} logo={logo} footerLabel={footerLabel} /> :
    <LoggedOutLayout footerLabel={footerLabel} />;
}

export default AppLayout;
