import React from 'react';
import { Button, Flex } from 'antd';
import CardLayout from '../../shared/CardLayout';
import ThrifterProfile from '../ThrifterProfile/ThrifterProfile';
import { useCurrentUser, useThrifter, thrifters } from '../../../api';

const ThrifterOnboardingConfirmation = ({onPrev, onNext}) => {

  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { thrifter, isLoading: isThrifterLoading } = useThrifter(currentUser?.thrifterId);
  const isLoading = isUserLoading || isThrifterLoading;

  if (isLoading) return null;

  const onSubmit = async () => {
    try {
      thrifters.update(thrifter.id, { status: 'active' });
      onNext();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CardLayout title="Review Your Information">
      <ThrifterProfile />
      <Flex justify="space-between" style={{marginTop: 20}}>
        <Button onClick={onPrev}>Back</Button>
        <Button type="primary" onClick={onSubmit}>Finish</Button>
      </Flex>
    </CardLayout>
  );
}

export default ThrifterOnboardingConfirmation;
