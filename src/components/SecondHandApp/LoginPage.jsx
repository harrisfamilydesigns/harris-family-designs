import React from 'react';
import { Button, Form, Typography, Alert, Input, Card, Row, Col } from 'antd';
import { auth } from '../../api';
import { useNavigate } from 'react-router-dom';
import { row, card } from '../../styles';
import ResendEmailConfirmationLink from '../shared/ResendEmailConfirmationLink';

const LoginPage = () => {
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setSubmitting(true);
    try {
      const { error } = await auth.login(form.email, form.password);
      if (error) { throw error; }
      navigate('/');
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Row style={row.flexRowCenterCenter}>
      <Col>
        <Card
          title="Login"
          style={card.standard}
        >
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
              <Button type="primary" htmlType="submit" disabled={submitting}>
                {submitting ? 'Logging in...' : 'Log in'}
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="link" onClick={() => navigate('/register')} style={{padding: 0}}>
                or Register
              </Button>
            </Form.Item>
          </Form>
          <ResendEmailConfirmationLink />
          {error && <Alert message="Error" description={error.message} type="error" showIcon closable onClose={() => setError(null)} />}
        </Card>
      </Col>
    </Row>
  );
}

export default LoginPage;
