import {useState} from 'react';
import { useCurrentUser, users } from '../../../api';
import { Alert, Button, Form, Input, Space, Typography } from 'antd';

const ChangeName = () => {
  const { currentUser, isLoading } = useCurrentUser();
  const [ editing, setEditing ] = useState(false);
  const [ submitting, setSubmitting ] = useState(false);
  const [ error, setError ] = useState('');

  if (isLoading) return null;

  const handleSubmit = async ({ firstName, lastName }) => {
    try {
      setSubmitting(true);
      const {error} = await users.updateCurrent({ firstName, lastName });
      if (error) throw new Error(error.message);
      setEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const ShowName = () => (
    <>
      <Typography.Title level={2} style={{ margin: 0 }}>
        <Space size="small">
          {[currentUser?.firstName, currentUser?.lastName].join(' ')}
          <Button size="small" type="link" style={{ padding: 0, margin: 0 }} onClick={() => setEditing(true)}>Edit</Button>
        </Space>
      </Typography.Title>
    </>
  )

  const EditingName = () => (
    <Form
      layout="vertical"
      name="changeName"
      initialValues={{
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter your first name.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter your last name.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={submitting}>Save</Button>
        <Button type="link" onClick={() => setEditing(false)} disabled={submitting}>Cancel</Button>
      </Form.Item>
      {error && <Alert message={error} type="error" />}
    </Form>
  )

  return editing ? <EditingName /> : <ShowName />;
}

export default ChangeName;
