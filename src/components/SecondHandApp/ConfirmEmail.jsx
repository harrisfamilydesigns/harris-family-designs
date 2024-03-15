import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Typography, Row, Col } from 'antd';
import { useCurrentUser, users } from '../../api';
import { card, row } from '../../styles';
import { mutate } from 'swr';

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const {data: currentUser} = useCurrentUser();

  useEffect(() => {
    const confirmEmail = async () => {
      if (currentUser?.unconfirmedEmail || !currentUser.confirmed) {
        try {
          const {data} = await users.confirmEmail(token);
          await mutate('/users/current');
          navigate(`/account?${createSearchParams({ success: data.message })}`);
        } catch (error) {
          console.log('error response received, responseReceivedAt was:', responseReceivedAt)
          navigate(`/account?${createSearchParams({ error: error.message })}`);
        }
      } else if (currentUser) {
        navigate(`/account?${createSearchParams({ info: 'Email already confirmed' })}`);
      }
    };


    confirmEmail();
  }, [currentUser]);

  return (
    <Row style={row.flexRowCenterCenter} justify="center">
      <Col>
        <Card style={card.standard} title="Confirm Email">
          <Typography.Paragraph>
            Confirming your email...
          </Typography.Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default ConfirmEmail;
