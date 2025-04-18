import React from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { Grid, Col, Row, Steps, App } from 'antd';
import ThrifterOnboardingIntroduction from './ThrifterOnboardingIntroduction';
// import ThrifterOnboardingContactVerification from './ThrifterOnboardingContactVerification';
import ThrifterOnboardingLocationDetails from './ThrifterOnboardingLocationDetails';
import ThrifterOnboardingThriftingPreferences from './ThrifterOnboardingThriftingPreferences';
import ThrifterOnboardingExperienceLevel from './ThrifterOnboardingExperienceLevel';
import ThrifterOnboardingPaymentInformation from './ThrifterOnboardingPaymentInformation';
import ThrifterOnboardingProfilePhotoAndBio from './ThrifterOnboardingProfilePhotoAndBio';
import ThrifterOnboardingConfirmation from './ThrifterOnboardingConfirmation';

const { useBreakpoint } = Grid;

const { Step } = Steps;

const OnboardingSteps = [
  { path: 'introduction', title: "Introduction", component: ThrifterOnboardingIntroduction },
  // // { path: 'contact-verification', title: "Contact Verification", component: ThrifterOnboardingContactVerification },
  { path: 'location-details', title: "Location Details", component: ThrifterOnboardingLocationDetails },
  { path: 'thrifting-preferences', title: "Thrifting Preferences", component: ThrifterOnboardingThriftingPreferences },
  { path: 'experience-level', title: "Experience Level", component: ThrifterOnboardingExperienceLevel },
  { path: 'payment-information', title: "Payment Information", component: ThrifterOnboardingPaymentInformation },
  { path: 'profile-photo-and-bio', title: "Profile Photo and Bio", component: ThrifterOnboardingProfilePhotoAndBio },
  { path: 'confirmation', title: "Confirmation", component: ThrifterOnboardingConfirmation },
];

const ThrifterOnboarding = () => {
  const { message } = App.useApp();
  let navigate = useNavigate();
  const screens = useBreakpoint();

  const findCurrentStepIndex = () => {
    const path = window.location.pathname.split('/').pop();
    const currentStepIndex = OnboardingSteps.findIndex(step => step.path === path);
    return currentStepIndex >= 0 ? currentStepIndex : 0;
  };

  const currentStep = findCurrentStepIndex();

  const nextStep = () => {
    if (currentStep < OnboardingSteps.length - 1) {
      navigate(OnboardingSteps[currentStep + 1].path);
    } else {
      message.success('Onboarding completed!');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      navigate(OnboardingSteps[currentStep - 1].path);
    }
  };

  return (
    <>
      <Row style={{margin: 20}}>
        <Col xs={24} sm={{ flex: 'auto'}} style={{...(!screens.xs && { maxWidth: 'calc(100% - 200px)'}) }}>
          <Routes>
            {OnboardingSteps.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component onNext={nextStep} onPrev={prevStep} />} />
            ))}
            <Route path="*" element={<Navigate replace to={OnboardingSteps[0].path} />} />
          </Routes>
        </Col>

        <Col xs={0} sm={{span: 24, flex: '200px' }}>
          <Steps
            current={currentStep}
            progressDot
            style={{ margin: 20 }}
            size='small'
            direction='vertical'
          >
            {OnboardingSteps.map(({ title, path }, index) => (
              <Step key={title} title={<Link to={path}>{title}</Link>} />
            ))}
          </Steps>
        </Col>
      </Row>
    </>
  );
};

export default ThrifterOnboarding;
