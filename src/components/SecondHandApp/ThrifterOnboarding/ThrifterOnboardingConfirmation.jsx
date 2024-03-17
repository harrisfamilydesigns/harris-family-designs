import React from 'react';
import { Card, Button } from 'antd';

const ThrifterOnboardingConfirmation = ({onPrev}) => {
  return (
    <Card title="Review Your Information" bordered={false}>
      <div>
        ThrifterOnboardingConfirmation
      </div>
      <Button onClick={onPrev}>Back</Button>
    </Card>
  );
}

export default ThrifterOnboardingConfirmation;
