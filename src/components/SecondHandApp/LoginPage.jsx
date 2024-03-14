import React from 'react';
import { Button, Form, Typography, Alert, Input, Card, Row, Col } from 'antd';
import { auth } from '../../api';
import { useNavigate } from 'react-router-dom';
import { row, card } from '../../styles';

// TODO: Placeholder for the login page
const LoginPage = () => {
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const login = async () => {
    try {
      await auth.login(form.email, form.password);
      navigate('/');
    } catch (error) {
      setError(error);
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
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="link" onClick={() => navigate('/register')} style={{padding: 0}}>
                or Register
              </Button>
            </Form.Item>
          </Form>
          {error && <Alert message="Error" description={error.message} type="error" showIcon />}
        </Card>
      </Col>
    </Row>
  );
}

export default LoginPage;
