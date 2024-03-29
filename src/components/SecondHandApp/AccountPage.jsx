import { Button, Form, Typography, Input, Alert, Tooltip, Popover } from 'antd';
import React from 'react';
import { useCurrentUser, users } from '../../api';
import FullPageSpinner from '../shared/FullPageSpinner';
import ResendEmailConfirmationLink from '../shared/ResendEmailConfirmationLink';
import CardLayout from '../shared/CardLayout';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ANTD } from '../../constants/colors';

const AccountPage = () => {
  const [submitMessage, setSubmitMessage] = React.useState({ type: '', message: '' });
  const [submitting, setSubmitting] = React.useState(false);
  const [form] = Form.useForm();
  const { currentUser, isLoading } = useCurrentUser();

  const resetForm = () => {
    form.setFieldsValue({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      password: '',
      passwordConfirmation: '',
      currentPassword: '',
    });
  }

  const handleSubmit = async (form) => {
    setSubmitting(true);
    try {
      const { error } = await users.update(form);
      if (error) { throw error; }
      let message = currentUser.email != form.email ? 'Account updated! Please check your inbox for a confirmation email.' : 'Account updated!';
      setSubmitMessage({
        type: 'success',
        message,
      });
      resetForm();
    } catch (error) {
      setSubmitMessage({ type: 'error', message: error.message, });
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading || !currentUser) {
    return <FullPageSpinner />;
  }

  return (
    <CardLayout title="Personal Details">
      <Form
        name="userInfo"
        layout="vertical"
        onFinish={handleSubmit}
        onChange={() => setSubmitMessage({ type: '', message: '' })}
        form={form}
        initialValues={{
          firstName: currentUser?.firstName,
          lastName: currentUser?.lastName,
          email: currentUser?.email,
          password: '',
          passwordConfirmation: '',
          currentPassword: '',
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
        >
          <Input />
        </Form.Item>

        {/* Email label should show "confirmed" with checkmark next to it */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input
            suffix={
              currentUser.confirmed && !currentUser.unconfirmedEmail ? (
                <Tooltip title="Email confirmed">
                  <CheckCircleOutlined
                    style={{color: ANTD.SUCCESS, fontSize: '16px'}}
                  />
                </Tooltip>
              ) : (
                <Popover
                  title="Email not confirmed"
                  content={<ResendEmailConfirmationLink />}
                >
                  <ExclamationCircleOutlined
                    style={{color: ANTD.WARNING, fontSize: '16px'}}
                  />
                </Popover>
              )
            }
          />
        </Form.Item>

        <Form.Item
          label="Change Password"
          name="password"
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          label="Change Password Confirmation"
          name="passwordConfirmation"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[{ required: true, message: 'Current password is required to make updates' }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Button disabled={submitting} type="primary" htmlType="submit" style={{
                display: 'block',
                marginRight: 'auto',
              }}>
              { submitting ? 'Submitting...' : 'Save' }
            </Button>
          </div>
        </Form.Item>
      </Form>
      {submitMessage?.message && <Alert type={submitMessage.type} message={submitMessage.message} />}
    </CardLayout>
  );
}

export default AccountPage;
