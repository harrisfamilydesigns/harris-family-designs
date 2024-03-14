import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { users } from '../../api';

const UserDashboardPage = () => {

  const { data: currentUser, error, isLoading } = useSWR(`/users/current`, async (_url) => {
    const { data } = await users.current();
    return data;
  });

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Row>
      <Col
        span={24}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          title="User Dashboard"
          style={{
            width: '100%',
            maxWidth: 600,
            margin: 'auto',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Typography>Welcome to the User Dashboard</Typography>
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
    // Show 50 red blocks stacked vertically
  );
}

export default UserDashboardPage;
