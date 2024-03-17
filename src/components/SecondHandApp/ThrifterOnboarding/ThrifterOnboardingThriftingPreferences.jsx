import React from 'react';
import { Card, Button } from 'antd';

const ThrifterOnboardingThriftingPreferences = ({onNext, onPrev}) => {
  return (
    <Card title="Select Your Thrifting Domains" bordered={false}>
      <div>
        ThrifterOnboardingThriftingPreferences
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </Card>
  );
}

export default ThrifterOnboardingThriftingPreferences;
