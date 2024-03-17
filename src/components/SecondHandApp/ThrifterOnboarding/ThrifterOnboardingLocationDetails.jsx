import React from 'react';
import { Card, Button } from 'antd';

const ThrifterOnboardingLocationDetails = ({onNext, onPrev}) => {
  return (
    <Card title="Where Do You Thrive?" bordered={false}>
      <div>
        ThrifterOnboardingLocationDetails
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </Card>
  );
}

export default ThrifterOnboardingLocationDetails;
