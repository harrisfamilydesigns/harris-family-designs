import React from 'react';
import { Form, Input, Button, Modal, Typography, Alert, Spin, App } from 'antd';
import { useCurrentUser } from '../../api';
import { auth } from '../../api';

// Link that opens a modal to resend the email confirmation link
const ResendEmailConfirmationLink = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { data: currentUser, isLoading } = useCurrentUser();
  const [submitting, setSubmitting] = React.useState(false);
  const [response, setResponse] = React.useState({
    type: '',
    message: ''
  });
  const [userEnteredEmail, setUserEnteredEmail] = React.useState('');
  const { message } = App.useApp();

  if (currentUser && currentUser.confirmed && !currentUser.unconfirmedEmail) {
    return;
  }

  const handleResendClicked = () => {
    if (currentUser) {
      sendEmailConfirmation();
    } else {
      setModalVisible(true);
    }
  }

  const sendEmailConfirmation = async () => {
    setSubmitting(true);
    try {
      let email = null;
      if (currentUser && currentUser.unconfirmedEmail) {
        email = currentUser.unconfirmedEmail;
      } else if (currentUser && currentUser.email && !currentUser.confirmed) {
        email = currentUser.email;
      } else {
        email = userEnteredEmail;
      }
      const { error } = await auth.sendEmailConfirmation(email);
      if (error) { throw error; }
      setModalVisible(false);
      message.success('Email confirmation link sent');
    } catch (error) {
      setResponse({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Typography.Text>
        { response.type === 'success' && <Typography.Text> Resent! </Typography.Text> }
        { response.type !== 'success' && (
          <Button type="link" onClick={handleResendClicked} style={{padding: 0}}>
            { submitting ? 'Sending...' : 'Resend confirmation email' }
          </Button>
        )}
      </Typography.Text>
      { !modalVisible && response.type && <Alert message={response.message} type={response.type} showIcon closable onClose={() => setResponse({ type: '', message: '' })} /> }

      {!currentUser && (
        <Modal
          title="Resend Email Confirmation Link"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false)
            setResponse({ type: '', message: '' });
          }}
          footer={null}
        >
          { response.type && <Alert message={response.message} type={response.type} showIcon closable onClose={() => setResponse({ type: '', message: '' })} /> }
          <Typography.Text>
            Please enter your email address to resend the email confirmation link.
          </Typography.Text>
          <Form
            style={{marginTop: 20}}
            onFinish={() => {
              sendEmailConfirmation();
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!', email: true }]}
            >
              <Input value={userEnteredEmail} onChange={e => setUserEnteredEmail(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                { submitting ? 'Sending...' : 'Send' }
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default ResendEmailConfirmationLink;
