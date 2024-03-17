import React from 'react';
import { Card, Button } from 'antd';

const ThrifterOnboardingProfilePhotoAndBio = ({onNext, onPrev}) => {
  return (
    <Card title="Showcase Your Thrifter Persona" bordered={false}>
      <div>
        ThrifterOnboardingProfilePhotoAndBio
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </Card>
  );
}

export default ThrifterOnboardingProfilePhotoAndBio;
