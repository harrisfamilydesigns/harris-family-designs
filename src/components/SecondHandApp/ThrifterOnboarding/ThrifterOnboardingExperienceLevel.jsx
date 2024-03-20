import React from 'react';
import { Card, Button } from 'antd';
import CardLayout from '../../shared/CardLayout';

const ThrifterOnboardingExperienceLevel = ({onNext, onPrev}) => {
  return (
    <CardLayout title="Share Your Thrifting Experience">
      <div>
        ThrifterOnboardingExperienceLevel
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </CardLayout>
  );
}

export default ThrifterOnboardingExperienceLevel;
