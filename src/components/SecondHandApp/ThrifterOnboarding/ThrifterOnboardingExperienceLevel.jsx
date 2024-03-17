import React from 'react';
import { Card, Button } from 'antd';

const ThrifterOnboardingExperienceLevel = ({onNext, onPrev}) => {
  return (
    <Card title="Share Your Thrifting Experience" bordered={false}>
      <div>
        ThrifterOnboardingExperienceLevel
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </Card>
  );
}

export default ThrifterOnboardingExperienceLevel;
