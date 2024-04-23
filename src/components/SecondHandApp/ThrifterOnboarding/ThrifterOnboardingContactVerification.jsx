import React from 'react';
import { Alert, Button, Form, Spin, Typography, Input, InputNumber } from 'antd';
import CardLayout from '../../shared/CardLayout';
import PhoneNumberInput from '../../shared/PhoneNumberInput';
import { users, useCurrentUser } from '../../../api';

const ThrifterOnboardingContactVerification = ({onNext, onPrev}) => {
  const { currentUser, isLoading} = useCurrentUser();
  const [verifying, setVerifying] = React.useState(false);
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handlePhoneSubmit = async ({unverifiedPhone}) => {
    setSubmitting(true);
    try {
      // const [error] = await users.sendPhoneVerification(unverifiedPhone);
      if (error) throw new Error(error.message);
      setVerifying(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }

  }

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" style={{marginTop: 16}}/>
    </div>
  );

  return (
    <CardLayout title="Stay Connected">
      <Typography.Paragraph style={{marginBottom: 20}}>
        We'll send a verification code to your phone.
        This ensures we can always reach you with important updates and customer requests.
      </Typography.Paragraph>

      {verifying && (
        <Form
          onFinish={handleVerificationSubmit}
          onChange={() => setError('')}
        >
          <Form.Item
            label="Verification Code"
            name="verificationCode"
            rules={[
              {
                required: true,
                message: 'Please input your verification code!',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={submitting}>
              {submitting ? 'Verifying...' : 'Verify'}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button style={{padding: 0}} type="link" onClick={() => setVerifying(false)}>Back</Button>
          </Form.Item>
        </Form>
      )}

      {!verifying && (
        <Form
          onFinish={handlePhoneSubmit}
          initialValues={{phone: currentUser?.unverifiedPhone}}
        >
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <PhoneNumberInput/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </Form.Item>
        </Form>
      )}
      {error && <Alert type="error">{error}</Alert>}
    </CardLayout>
  );
}

export default ThrifterOnboardingContactVerification;
