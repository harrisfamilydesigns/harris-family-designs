import React from 'react';
import { Card, Button } from 'antd';
import CardLayout from '../../shared/CardLayout';

const ThrifterOnboardingThriftingPreferences = ({onNext, onPrev}) => {
  return (
    <CardLayout title="Select Your Thrifting Domains">
      <div>
        ThrifterOnboardingThriftingPreferences
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </CardLayout>
  );
}

export default ThrifterOnboardingThriftingPreferences;
