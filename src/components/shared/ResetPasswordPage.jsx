import { Card, Col, Form, Layout, Row } from 'antd';
import React from 'react';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { auth } from '../../api';
import { Alert, Button, Input } from 'antd';
import { card, row } from '../../styles';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  // Token sent from email
  const token = searchParams.get('token');
  const [form, setForm] = React.useState({
    token,
    password: '',
    confirmPassword: '',
  });
  const [response, setResponse] = React.useState({
    type: '',
    message: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { error } = await auth.resetPassword(
        form.password,
        form.confirmPassword,
        form.token,
      );
      if (error) {
        throw error;
      }
      navigate(`/login?${createSearchParams({ success: 'Password reset, please login' })}`);
    } catch (error) {
      setResponse({ type: 'error', message: error.message });
    }
  }

  return (
    <Row style={row.flexRowCenterCenter}>
      <Col>
        <Card title="Reset Password" style={{...card.standard, marginTop: 20}}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={form}
            onChange={() => setResponse({ type: '', message: '' })}
          >
            <Form.Item label="Password" name="password">
              <Input.Password
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <Input.Password
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>
            {response.type && (
              <Alert
                message={response.message}
                type={response.type}
                showIcon
                closable
                onClose={() => setResponse({ type: '', message: '' })}
              />
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default ResetPasswordPage;
