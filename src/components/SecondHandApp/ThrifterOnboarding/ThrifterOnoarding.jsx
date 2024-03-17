import React, { useState } from 'react';
import { Card, Button, Steps, message, Select, Row, Col } from 'antd';
import ThrifterOnboardingIntroduction from './ThrifterOnboardingIntroduction';
import ThrifterOnboardingContactVerification from './ThrifterOnboardingContactVerification';
import ThrifterOnboardingLocationDetails from './ThrifterOnboardingLocationDetails';
import ThrifterOnboardingThriftingPreferences from './ThrifterOnboardingThriftingPreferences';
import ThrifterOnboardingExperienceLevel from './ThrifterOnboardingExperienceLevel';
import ThrifterOnboardingPaymentInformation from './ThrifterOnboardingPaymentInformation';
import ThrifterOnboardingProfilePhotoAndBio from './ThrifterOnboardingProfilePhotoAndBio';
import { row } from '../../../styles';

const { Step } = Steps;

const OnboardingSteps = [
  {key: "introduction", title: "Introduction", component: <ThrifterOnboardingIntroduction />},
  {key: "contactVerification", title: "Contact Verification", component: <ThrifterOnboardingContactVerification />},
  {key: "locationDetails", title: "Location Details", component: <ThrifterOnboardingLocationDetails />},
  {key: "thriftingPreferences", title: "Thrifting Preferences", component: <ThrifterOnboardingThriftingPreferences />},
  {key: "experienceLevel", title: "Experience Level", component: <ThrifterOnboardingExperienceLevel />},
  {key: "paymentInformation", title: "Payment Information", component: <ThrifterOnboardingPaymentInformation />},
  {key: "profilePhotoAndBio", title: "Profile Photo and Bio", component: <ThrifterOnboardingProfilePhotoAndBio />},
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < OnboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      message.success('Onboarding completed!');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Row style={row.flexRowCenterCenter}>
      <Col span={20} >
        <Steps current={currentStep}
          style={{ marginTop: 20, marginBottom: 20 }}
          progressDot
        >
          {OnboardingSteps.map(({key, title}) => (
            <Step key={key} title={title} />
          ))}
        </Steps>
        <div className="steps-content" style={{ marginTop: 20 }}>
          <Card title={OnboardingSteps[currentStep].title} bordered={false}>
            {OnboardingSteps[currentStep].component}
          </Card>
        </div>
        <div className="steps-action" style={{ marginTop: 20 }}>
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prevStep()}>
              Previous
            </Button>
          )}
          {currentStep < OnboardingSteps.length - 1 && (
            <Button type="primary" onClick={() => nextStep()}>
              Next
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Onboarding;
