import { Alert, Card, Col, Row, Spin, Typography } from 'antd';
import React from 'react';
import { useCurrentUser } from '../../api';
import { row, card } from '../../styles';

const UserDashboardPage = () => {

  const { data: currentUser, error, isLoading } = useCurrentUser();

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
            <>
              <Typography>Hey {currentUser?.firstName || 'there'}!</Typography>
              { error && <Alert message={error.message} type="error" /> }
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default UserDashboardPage;
