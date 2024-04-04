import { Alert, Spin, Typography } from 'antd';
import React from 'react';
import { useCurrentUser } from '../../api';
import { row } from '../../styles';
import CardLayout from '../shared/CardLayout';
import CustomerOnboardingCTA from './CustomerOnboarding/CustomerOnboardingCTA';

const UserDashboardPage = () => {
  const { currentUser, error, isLoading } = useCurrentUser();
  const noAccountSetUp = !currentUser.thrifterAccountComplete && !currentUser.customerAccountComplete

  const Loading = () => (
    <div style={row.flexRowCenterCenter}>
      <Spin />
    </div>
  )

  return (
    <CardLayout title="User Dashboard">
      { isLoading && <Loading /> }
      { noAccountSetUp ? <CustomerOnboardingCTA /> : (
        <Typography>Hey {currentUser?.firstName || 'there'}!</Typography>
      )}
      { error && <Alert message={error.message} type="error" /> }
    </CardLayout>
  );
}

export default UserDashboardPage;
