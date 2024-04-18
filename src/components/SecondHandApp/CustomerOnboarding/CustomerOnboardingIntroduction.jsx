import React from 'react';
import { Alert, Button, Form, Typography } from 'antd';
import CardLayout from '../../shared/CardLayout';

const CustomerOnboardingIntroduction = ({onNext}) => {
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      onNext();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <CardLayout title="Welcome to SecondHand!">
      <>
        <Typography>
          It looks like you're new here. Let's get you started!
        </Typography>
        <Form
          name="customer-onboarding-introduction"
          initialValues={{}}
          onChange={() => setError('')}
          onFinish={onSubmit}
        >
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <Button type="primary" htmlType='submit' disabled={submitting}>Get Started</Button>
            </div>
          </Form.Item>
        </Form>

        { error && <Alert message={error} type="error" /> }
      </>
    </CardLayout>
  )
}

export default CustomerOnboardingIntroduction;
