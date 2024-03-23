import React from 'react';
import { Button, Form, Select, Alert, Spin, App } from 'antd';
import CardLayout from '../../shared/CardLayout';
import Typography from 'antd/es/typography/Typography';
import { useCurrentUser, users } from '../../../api';

const ThrifterOnboardingExperienceLevel = ({onNext, onPrev}) => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const { message } = App.useApp();

  const handleSubmit = async ({ experienceLevel }) => {
    setSubmitting(true);
    try {
      const { error } = await users.updateCurrent({ experienceLevel });
      if (error) throw new Error(error);
      message.success('Your experience level has been saved!');
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

  const options = [
    { key: "new", title: "New to thrifting" },
    { key: "intermediate", title: "Intermediate" },
    { key: "experienced", title: "Experienced" },
  ];

  return (
    <CardLayout title="Share Your Thrifting Experience">
      <Typography.Paragraph>
        Are you a seasoned thrifter or new to the game?
        Your experience level helps us support you better.
      </Typography.Paragraph>
      <Form
        name="thrifter-onboarding-experience-level"
        onFinish={handleSubmit}
        initialValues={{
          experienceLevel: currentUser?.experienceLevel,
        }}
        onChange={() => setError('')}
      >
        <Form.Item
          label="Experience Level"
          name="experienceLevel"
          rules={[
            {
              required: true,
              message: 'Please select your experience level!',
            },
          ]}
        >
          <Select
            placeholder="Select your experience level"
          >
            {options.map(({ key, title }) => (
              <Select.Option key={key} value={key}>{title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="link" onClick={onPrev} style={{padding: 0}}>Back</Button>
            <Button type="primary" htmlType="submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </Form.Item>
        {error && <Alert message={error} type="error" />}
      </Form>
    </CardLayout>
  );
}

export default ThrifterOnboardingExperienceLevel;
