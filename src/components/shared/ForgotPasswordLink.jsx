import { Button, Form, Modal, Alert, Input, Typography } from 'antd';
import React from 'react';
import { auth } from '../../api';
import { useSearchParams } from 'react-router-dom';

const ForgotPasswordLink = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [response, setResponse] = React.useState({
    type: '',
    message: ''
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await auth.sendForgotPasswordEmail(email);
      if (error) { throw error; }
      setEmail('');
      setModalVisible(false);
      setSearchParams({ success: 'Password reset email sent' });
    } catch (error) {
      setResponse({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button type="link" onClick={() => {setModalVisible(true)}} style={{padding: 0}}>
        Forgot your password?
      </Button>
      <Modal
        title="Forgot Password"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Typography.Text>
          Enter your email address and we will send you a link to reset your password.
        </Typography.Text>
        <Form
          name="forgotPassword"
          onFinish={() => handleSubmit()}
          onChange={() => setResponse({ type: '', message: '' })}
          style={{marginTop: 20, marginBottom: 20}}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input
              value={email}
              onChange={ e => setEmail(e.target.value) }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            { submitting ? 'Sending...' : 'Send' }
          </Button>
        </Form>

        { response.type && <Alert message={response.message} type={response.type} showIcon closable onClose={() => setResponse({ type: '', message: '' })} /> }

      </Modal>
    </>
  );
}

export default ForgotPasswordLink;
