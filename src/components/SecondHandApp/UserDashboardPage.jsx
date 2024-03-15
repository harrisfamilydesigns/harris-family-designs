import { Button, Card, Col, Row, Typography } from 'antd';
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

  const navigate = useNavigate();
  const logout = () => {
    tokenProvider.removeToken();
    navigate('/login');
  }

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
          <Typography>Welcome to the User Dashboard</Typography>
          {tokenProvider.getToken() && <Typography>Token: {tokenProvider.getToken()}</Typography>}
          {isLoading && <Typography>Loading...</Typography>}
          {currentUser && (
            <div>
              <pre>
                {JSON.stringify(currentUser, null, 2)}
              </pre>

              <Button type="primary" onClick={logout}>Logout</Button>
            </div>
          )}
          {error && <p>Error: {error.message}</p>}
        </Card>
      </Col>
    </Row>
  );
}

export default UserDashboardPage;
