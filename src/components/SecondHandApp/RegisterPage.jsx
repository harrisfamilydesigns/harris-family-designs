import { Button, Typography, Form, Alert, Input, Card, Row, Col } from 'antd';
import React from 'react';
import { auth } from '../../api';
import { useNavigate } from 'react-router-dom';
import { row, card } from '../../styles';

// TODO: Placeholder for the register page
const RegisterPage = () => {
  const [form, setForm] = React.useState({ email: '', password: '', passwordConfirmation: '' });
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const register = async () => {
    try {
      await auth.register(form.email, form.password, form.passwordConfirmation);
      navigate('/');
    } catch (error) {
      setError(error);
    }
  }

  return (
    <Row style={row.flexRowCenterCenter}>
      <Col>
        <Card
          title="Register"
          style={card.standard}
        >
          <Typography.Title level={2}>Register</Typography.Title>
          <Form
            name="register"
            onFinish={register}
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

            <Form.Item
              label="Password Confirmation"
              name="passwordConfirmation"
              rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
              <Input
                type="password"
                value={form.passwordConfirmation}
                onChange={
                  e => setForm({ ...form, passwordConfirmation: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="link" onClick={() => navigate('/login')} style={{padding: 0}}>
                or Login
              </Button>
            </Form.Item>
          </Form>
          {error && <Alert message="Error" description={error.message} type="error" showIcon />}
        </Card>
      </Col>
    </Row>
  );
}

export default RegisterPage;
