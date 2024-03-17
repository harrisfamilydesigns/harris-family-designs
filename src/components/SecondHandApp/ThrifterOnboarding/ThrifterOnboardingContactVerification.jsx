import React from 'react';
import { Button, Card } from 'antd';

const ThrifterOnboardingContactVerification = ({onNext, onPrev}) => {
  return (
    <Card title="Stay Connected" bordered={false}>
      <div>
        ThrifterOnboardingContactVerification
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </Card>
  );
}

export default ThrifterOnboardingContactVerification;
