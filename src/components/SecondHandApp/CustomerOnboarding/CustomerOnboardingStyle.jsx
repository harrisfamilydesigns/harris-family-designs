import React from 'react';
import CardLayout from '../../shared/CardLayout';
import { Button, Checkbox, Form, Typography } from 'antd';

// Card 3: Personal Interests
// Title: "Tell Us About Your Style"
// Description: "Select the styles and brands you love to help us tailor our recommendations."
// Fields: Multi-select checkboxes (e.g., Vintage, Casual, Formalwear), and a dropdown for favorite brands
// Action: "Continue" button

const CustomerOnboardingStyle = ({onBack, onNext}) => {

  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      // Call API to save user's style preferences
      onNext();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <CardLayout title="Tell Us About Your Style">
      <Typography.Text>
        Select the styles and brands you love to help us tailor our recommendations.
      </Typography.Text>
      <Form
        name="customer-onboarding-style"
        initialValues={{}}
        onChange={() => setError('')}
        onFinish={onSubmit}
      >
        {/* Multi-select checkboxes */}
        <Form.Item name="styles" label="Styles">
          {/* Checkbox.Group */}
          <Checkbox.Group>
            {/* Checkbox */}
            <Checkbox value="vintage">Vintage</Checkbox>
            <Checkbox value="casual">Casual</Checkbox>
            <Checkbox value="formalwear">Formalwear</Checkbox>
          </Checkbox.Group>

        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <Button
              onClick={onBack}
            >Back</Button>
            <Button
              type="primary"
              htmlType='submit'
              disabled={submitting}
            >Continue</Button>
          </div>
        </Form.Item>

        { error && <Alert message={error} type="error" /> }
      </Form>

    </CardLayout>
  );
}

export default CustomerOnboardingStyle;
