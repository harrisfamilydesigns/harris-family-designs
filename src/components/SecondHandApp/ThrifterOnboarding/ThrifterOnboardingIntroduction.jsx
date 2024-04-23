import React from 'react';
import { Form, Input, Button, Spin, Alert, App, Typography } from 'antd';
import { useCurrentUser, users } from '../../../api';
import CardLayout from '../../shared/CardLayout';

const ThrifterOnboardingIntroduction = ({onNext}) => {
  const { currentUser, isLoading} = useCurrentUser();
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const { message } = App.useApp();

  const onFinish = async (form) => {
    try {
      setSubmitting(true);
      const {error} = await users.updateCurrent(form);
      if (error) throw new Error(error.message);
      message.success('Your name has been saved!');
      onNext();
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
    <CardLayout title="Welcome to Your Thrifting Journey!">
      <Typography.Paragraph>
        Before you start delighting customers with your unique finds, let's get to know you better.
        This helps us tailor the experience to your strengths and interests.
      </Typography.Paragraph>

      <Form
        name="thrifter-onboarding-introduction"
        onFinish={onFinish}
        initialValues={{
          firstName: currentUser?.firstName,
          lastName: currentUser?.lastName,
        }}
        onChange={() => setError('')}
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" htmlType="submit" disabled={submitting}>
              {submitting ? 'Submitting' : 'Continue'}
            </Button>
          </div>
        </Form.Item>
      </Form>

      {error && <Alert message={error} type="error"/>}
    </CardLayout>
  );
}

export default ThrifterOnboardingIntroduction;
