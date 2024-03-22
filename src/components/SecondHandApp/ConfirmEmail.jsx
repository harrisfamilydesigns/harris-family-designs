import React, { useEffect } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Typography } from 'antd';
import { useCurrentUser, users } from '../../api';
import { mutate } from 'swr';
import CardLayout from '../shared/CardLayout';

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const {data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  useEffect(() => {
    const confirmEmail = async () => {
      if (isUserLoading) return;
      if (currentUser) {
        // User is logged in and needs to confirm email
        if (currentUser.unconfirmedEmail || !currentUser.confirmed) {
          try {
            const { data, error } = await users.confirmEmail(token);
            if (error) { throw error; }

            await mutate('/users/current');
            return navigate(`/account?${createSearchParams({ success: data.message })}`);
          } catch (error) {
            return navigate(`/account?${createSearchParams({ error: error.message })}`);
          }
        } else {
          return navigate(`/account?${createSearchParams({ info: 'Email already confirmed' })}`);
        }
      } else {
        try {
          const { data, error } = await users.confirmEmail(token);
          if (error) { throw error; }
          return navigate(`/login?${createSearchParams({ success: data.message })}`)
        } catch (error) {
          return navigate(`/login?${createSearchParams({ error: error.message })}`);
        }
      }
    };


    confirmEmail();
  }, [currentUser, isUserLoading]);

  return (
    <CardLayout col={{xs: 24, lg: 16, xl: 14, xxl: 12}} title="Confirm Email">
      <Typography.Paragraph>
        Confirming your email...
      </Typography.Paragraph>
    </CardLayout>
  );
};

export default ConfirmEmail;
