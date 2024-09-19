import React from 'react';
import { Button, Form, Alert, Input } from 'antd';
import { auth, useCurrentUser, users } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import ResendEmailConfirmationLink from '../shared/ResendEmailConfirmationLink';
import ForgotPasswordLink from '../shared/ForgotPasswordLink';
import CardLayout from '../shared/CardLayout';
import { SECOND_HAND_ROOT } from '../../Routes';

const LoginPage = () => {
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  React.useEffect(() => {
    if (currentUser) navigate(SECOND_HAND_ROOT)
  }, [currentUser])

  const login = async () => {
    setSubmitting(true);
    try {
      const { error } = await auth.login(form.email, form.password);
      await users.current();
      if (error) { throw error; }
      navigate('/second_hand');
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <CardLayout col={{xs: 24, lg: 16, xl: 14, xxl: 12}} title="Login">
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={login}
        onChange={() => setError(null)}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            value={form.email}
            onChange={
              e => setForm({ ...form, email: e.target.value })
            }
          />
        </Form.Item>

        {/* should hide input */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            type="password"
            value={form.password}
            onChange={
              e => setForm({ ...form, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Log in'}
          </Button>
        </Form.Item>

        <Form.Item>
          <Link to="../register">
            Create an account
          </Link>
        </Form.Item>
      </Form>
      <div>
        <ResendEmailConfirmationLink />
      </div>
      <div>
        <ForgotPasswordLink />
      </div>
      {error && <Alert message="Error" description={error.message} type="error" showIcon closable onClose={() => setError(null)} />}
    </CardLayout>
  );
}

export default LoginPage;
