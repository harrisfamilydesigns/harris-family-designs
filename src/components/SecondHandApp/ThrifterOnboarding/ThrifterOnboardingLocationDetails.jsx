import React from 'react';
import { Button, Form, Input, Alert, Spin, App } from 'antd';
import CardLayout from '../../shared/CardLayout';
import Typography from 'antd/es/typography/Typography';
import { useCurrentUser, users } from '../../../api';

const ThrifterOnboardingLocationDetails = ({onNext, onPrev}) => {
  const {data: currentUser, isLoading}  = useCurrentUser();
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const { message } = App.useApp();

  const handleSubmit = async ({address}) => {
    setSubmitting(true);
    try {
      const {error} = await users.updateCurrent({address});
      if (error) throw new Error(error);
      message.success('Your address has been saved!');
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
    <CardLayout title="Where Do You Thrive?">
      <Typography.Paragraph>
        Your local area is a treasure trove of finds. Sharing your location helps us connect you with customers eager for local gems.
      </Typography.Paragraph>
      <Form
        name="thrifter-onboarding-location-details"
        onChange={() => setError('')}
        onFinish={handleSubmit}
        initialValues={{
          address: currentUser?.address,
        }}
      >
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="text" onClick={onPrev}>Back</Button>
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

export default ThrifterOnboardingLocationDetails;
