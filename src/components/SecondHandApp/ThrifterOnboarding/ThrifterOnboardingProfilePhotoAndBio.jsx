import React from 'react';
import { Card, Button } from 'antd';
import CardLayout from '../../shared/CardLayout';

const ThrifterOnboardingProfilePhotoAndBio = ({onNext, onPrev}) => {
  return (
    <CardLayout title="Showcase Your Thrifter Persona">
      <div>
        ThrifterOnboardingProfilePhotoAndBio
      </div>
      <Button onClick={onPrev}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </CardLayout>
  );
}

export default ThrifterOnboardingProfilePhotoAndBio;
