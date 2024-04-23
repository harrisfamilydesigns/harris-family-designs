import React from 'react';
import { Button, Form, App, Alert, Checkbox, Row, Col, Spin } from 'antd';
import CardLayout from '../../shared/CardLayout';
import Typography from 'antd/es/typography/Typography';
import { useCurrentUser, useThrifter, thrifters } from '../../../api';
import { preferenceSections } from '../../../data/thrifterPreferences';

const ThrifterOnboardingThriftingPreferences = ({ onNext, onPrev }) => {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { thrifter, isLoading: isThrifterLoading } = useThrifter(currentUser?.thrifterId);
  const isLoading = isUserLoading || isThrifterLoading;
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const { message } = App.useApp();

  const handleSubmit = async ({ preferences }) => {
    setSubmitting(true);
    try {
      const { error } = await thrifters.update(thrifter.id, { preferences });
      if (error) throw new Error(error);
      message.success('Your thrifting preferences have been saved!');
      onNext();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" style={{marginTop: 16}}/>
    </div>
  );

  return (
    <CardLayout title="Select Your Thrifting Domains">
      <Typography.Paragraph>
        Every Thrifter has their niches. What categories spark joy for you? This helps us match you with customers who love what you love.
      </Typography.Paragraph>
      <Form
        name="thrifter-onboarding-thrifting-preferences"
        onFinish={handleSubmit}
        initialValues={{
          preferences: thrifter?.preferences || {}
        }}
        onChange={() => setError('')}
      >
        <Row>
          {preferenceSections.map(({title, key, options}) => (
            <Col span={24} xl={12} xxl={8} key={key}>
              <Typography.Title level={5} style={{marginTop: 0}}>{title}</Typography.Title>
              <Form.Item name={['preferences', key]}>
                <Checkbox.Group
                  options={options.map(({ key: optionKey, title: optionTitle }) => ({ label: optionTitle, value: optionKey }))}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>

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
};

export default ThrifterOnboardingThriftingPreferences;
