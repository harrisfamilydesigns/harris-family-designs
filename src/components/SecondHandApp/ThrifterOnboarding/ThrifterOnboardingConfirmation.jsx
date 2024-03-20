import React from 'react';
import { Card, Button } from 'antd';
import CardLayout from '../../shared/CardLayout';

const ThrifterOnboardingConfirmation = ({onPrev}) => {
  return (
    <CardLayout title="Review Your Information">
      <div>
        ThrifterOnboardingConfirmation
      </div>
      <Button onClick={onPrev}>Back</Button>
    </CardLayout>
  );
}

export default ThrifterOnboardingConfirmation;
