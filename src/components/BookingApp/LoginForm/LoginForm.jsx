import { Button, Form, Input } from "antd";

export default function LoginForm({ onSwitch }) {

  const handleLogin = (values) => {
    console.log('Received values:', values);
  }

  return (
    <Form
      name="login"
      initialValues={{
        email: '',
        password: '',
        remember: false
      }}
      onFinish={handleLogin}
    >
      <Form.Item name="email" rules={[{ required: true, message: 'Email required' }]}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: 'Password required' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">Login</Button>
      </Form.Item>

      <Form.Item>
        <span>Don't have an account?</span>
        <Button type="link" className="m-0" onClick={onSwitch}>Sign Up</Button>
      </Form.Item>

    </Form>
  )
}
