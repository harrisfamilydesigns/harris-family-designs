import { Alert, Spin, Typography } from 'antd';
import React from 'react';
import { useCurrentUser } from '../../api';
import { row } from '../../styles';
import CardLayout from '../shared/CardLayout';

const UserDashboardPage = () => {
  const { currentUser, error, isLoading } = useCurrentUser();

  return (
    <CardLayout title="User Dashboard">
      { isLoading ? (
        <div style={row.flexRowCenterCenter}>
          <Spin />
        </div>
      ) : (
        <>
          <Typography>Hey {currentUser?.firstName || 'there'}!</Typography>
          { error && <Alert message={error.message} type="error" /> }
        </>
      )}
    </CardLayout>
  );
}

export default UserDashboardPage;
