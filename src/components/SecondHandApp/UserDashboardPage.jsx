import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { users, tokenProvider } from '../../api';
import { row, card } from '../../styles';

const UserDashboardPage = () => {

  const { data: currentUser, error, isLoading } = useSWR(`/users/current`, async (_url) => {
    const { data } = await users.current();
    return data;
  });

  return (
    <Row>
      <Col
        span={24}
        style={row.flexRowCenterCenter}
      >
        <Card
          title="User Dashboard"
          style={card.standard}
        >
          { isLoading ? (
            <div style={row.flexRowCenterCenter}>
              <Spin />
            </div>
          ) : (
            <Typography>Hey {currentUser?.firstName || 'there'}!</Typography>
          )}
          {error && <p>Error: {error.message}</p>}
        </Card>
      </Col>
    </Row>
  );
}

export default UserDashboardPage;
