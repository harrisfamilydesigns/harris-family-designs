import { Alert, Spin, Typography } from 'antd';
import React from 'react';
import { useCurrentUser } from '../../api';
import { row } from '../../styles';
import CardLayout from '../shared/CardLayout';
import { Navigate } from 'react-router-dom';

const UserDashboardPage = () => {
  const { currentUser, error, isLoading } = useCurrentUser();
  const noAccountSetUp = !currentUser.thrifterAccountComplete && !currentUser.customerAccountComplete

  const Loading = () => (
    <div style={row.flexRowCenterCenter}>
      <Spin />
    </div>
  )

  if (isLoading) {
    return <Loading />
  }

  if (noAccountSetUp) {
    return <Navigate to="/customer/onboarding" />
  }

  return (
    <CardLayout title="User Dashboard">
      <Typography>Hey {currentUser?.firstName || 'there'}!</Typography>
      { error && <Alert message={error.message} type="error" /> }
    </CardLayout>
  );
}

export default UserDashboardPage;
