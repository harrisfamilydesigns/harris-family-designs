import { App, Col, Grid, Row, Steps } from "antd";
import CustomerOnboardingIntroduction from "./CustomerOnboardingIntroduction";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;

const { Step } = Steps;

const OnboardingSteps = [
  { path: 'introduction', title: "Introduction", component: CustomerOnboardingIntroduction },
  // // { path: 'contact-verification', title: "Contact Verification", component: ThrifterOnboardingContactVerification },
  // { path: 'location-details', title: "Location Details", component: ThrifterOnboardingLocationDetails },
  // { path: 'thrifting-preferences', title: "Thrifting Preferences", component: ThrifterOnboardingThriftingPreferences },
  // { path: 'experience-level', title: "Experience Level", component: ThrifterOnboardingExperienceLevel },
  // { path: 'payment-information', title: "Payment Information", component: ThrifterOnboardingPaymentInformation },
  // { path: 'profile-photo-and-bio', title: "Profile Photo and Bio", component: ThrifterOnboardingProfilePhotoAndBio },
  // { path: 'confirmation', title: "Confirmation", component: ThrifterOnboardingConfirmation },
];

const CustomerOnboarding = () => {
  const { message } = App.useApp();
  let navigate = useNavigate();
  const screens = useBreakpoint();

  const findCurrentStepIndex = () => {
    const path = window.location.pathname.split('/').pop();
    const currentStepIndex = OnboardingSteps.findIndex(step => step.path === path);
    return currentStepIndex >= 0 ? currentStepIndex : 0;
  };

  const currentStep = findCurrentStepIndex();

  const navigateToStep = (path) => {
    navigate(`/customer/onboarding/${path}`);
  }

  const nextStep = () => {
    if (currentStep < OnboardingSteps.length - 1) {
      navigateToStep(OnboardingSteps[currentStep + 1].path);
    } else {
      message.success('Onboarding completed!');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      navigateToStep(OnboardingSteps[currentStep - 1].path);
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
            <Route path="/" element={<Navigate to="introduction" />} />
          </Routes>
        </Col>

        <Col xs={0} sm={8} style={{padding: 20}}>
          <Steps
            current={currentStep}
            progressDot
            style={{ margin: 20 }}
            size="small"
            direction="vertical"
          >
            {OnboardingSteps.map(({ title }, index) => (
              <Step
                key={title}
                title={title}
                onClick={() => navigateToStep(OnboardingSteps[index].path)}
                style={{cursor: 'pointer'}} />
            ))}
          </Steps>
        </Col>
      </Row>
    </>
  );
};

export default CustomerOnboarding;
