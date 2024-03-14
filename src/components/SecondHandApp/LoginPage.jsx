import React from 'react';
import { Button, Form, Typography, Alert, Input } from 'antd';
import { auth } from '../../api';
import { useNavigate } from 'react-router-dom';

// TODO: Placeholder for the login page
const LoginPage = () => {
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const login = async () => {
    try {
      await auth.login(form.email, form.password);
      navigate('/dashboard');
    } catch (error) {
      setError(error);
    }
  }


  return (
    <div>
      <Typography.Title level={2}>Login</Typography.Title>
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
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message="Error" description={error.message} type="error" showIcon />}
    </div>
  );
}

export default LoginPage;
