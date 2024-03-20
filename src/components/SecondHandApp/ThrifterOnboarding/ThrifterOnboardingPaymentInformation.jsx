import React from 'react';
import { Card, Button } from 'antd';
import CardLayout from '../../shared/CardLayout';

const ThrifterOnboardingPaymentInformation = ({onNext, onPrev}) => {
  return (
    <CardLayout title="Getting Paid for Your Finds">
      <div>
        ThrifterOnboardingPaymentInformation
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </CardLayout>
  );
}

export default ThrifterOnboardingPaymentInformation;
