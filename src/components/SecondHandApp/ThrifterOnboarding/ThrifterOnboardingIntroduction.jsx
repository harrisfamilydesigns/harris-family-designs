import React from 'react';
import { Card, Form, Input, Button, Spin, message, Alert, Typography } from 'antd';
import { useCurrentUser, users } from '../../../api';

const ThrifterOnboardingIntroduction = ({onNext}) => {
  const [api, contextHolder] = message.useMessage();
  const {data: currentUser, isLoading} = useCurrentUser();
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const onFinish = async (form) => {
    try {
      setSubmitting(true);
      const {error} = await users.updateCurrent(form);
      if (error) throw new Error(error);
      api.success('Your information has been updated!');
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
    <Card title="Welcome to Your Thrifting Journey!" bordered={false}>
      {contextHolder}
      <div>
        Before you start delighting customers with your unique finds, let's get to know you better.
        This helps us tailor the experience to your strengths and interests.
      </div>

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
          <Button type="primary" htmlType="submit" disabled={submitting}>
            {submitting ? 'Submitting' : 'Continue'}
          </Button>
        </Form.Item>
      </Form>

      {error && <Alert message={error} type="error"/>}
    </Card>
  );
}

export default ThrifterOnboardingIntroduction;
