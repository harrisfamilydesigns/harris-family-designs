import React from 'react';
import { Card, Button } from 'antd';

const ThrifterOnboardingPaymentInformation = ({onNext, onPrev}) => {
  return (
    <Card title="Getting Paid for Your Finds" bordered={false}>
      <div>
        ThrifterOnboardingPaymentInformation
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </Card>
  );
}

export default ThrifterOnboardingPaymentInformation;
