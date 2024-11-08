import { Button, Form, Input } from "antd";

export default function SignupForm({ onSwitch }) {

  const handleLogin = (values) => {
    console.log('Received values:', values);
  }

  return (
    <Form
      name="signup"
      initialValues={{
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      onFinish={handleLogin}
    >
      <Form.Item name="email" rules={[{ required: true, message: 'Email required' }]}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: 'Password required' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item name="passwordConfirmation" rules={[{ required: true, message: 'Password required' }]}>
        <Input.Password placeholder="Confirm password" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">Sign up</Button>
      </Form.Item>

      <Form.Item>
        Already have an account?
        <Button type="link" className="m-0" onClick={onSwitch}>Login</Button>
      </Form.Item>
    </Form>
  )
}
