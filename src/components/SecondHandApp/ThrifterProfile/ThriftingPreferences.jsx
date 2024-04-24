import { useState, createElement } from 'react';
import { Alert, Button, Card, Checkbox, Col, Flex, Form, Row, Space, Spin, Typography } from "antd"
import { useCurrentUser, useThrifter, thrifters } from "../../../api";
import { preferenceSections } from '../../../data/thrifterPreferences';
import { humanize } from '../../../utils/humanize';


const ThriftingPreferences = () => {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { thrifter, isLoading: isThrifterloading } = useThrifter(currentUser?.thrifterId);
  const isLoading = isUserLoading || isThrifterloading;
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" style={{marginTop: 16}}/>
    </div>
  );

  const handleSubmit = ({ preferences }) => {
    try {
      setSubmitting(true);
      const { error } = thrifters.update(thrifter.id, { preferences });
      if (error) throw new Error(error.message);
      setEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const EditThrifterPreferences = () => {
    return (
      <Row>
        <Form
          name="thrifter-preferences"
          initialValues={{
            preferences: thrifter?.preferences || {}
          }}
          onFinish={handleSubmit}
          onChange={() => setError(null)}
        >
          {
            preferenceSections.map(({ title, key, icon, options }) => (
              <Col key={key} style={{marginLeft: 5, marginRight: 5}}>
                <Card style={{ marginBottom: 16 }} title={(
                  <Space align='start'>
                    {createElement(icon)}
                    <Typography.Text>{title}</Typography.Text>
                  </Space>
                )}>
                  <Form.Item name={['preferences', key]}>
                    <Checkbox.Group
                      options={options.map((option) => ({ label: option.title, value: option.key }))}
                    />
                  </Form.Item>
                </Card>
              </Col>
            ))
          }
          <Form.Item>
            <Flex justify="end" align="center">
              <Space>
                <Button onClick={() => setEditing(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit" loading={submitting}>Save</Button>
              </Space>
            </Flex>
            {error && <Alert message={error} type="error" />}
          </Form.Item>
        </Form>
      </Row>
    )
  }

  const ViewThrifterPreferences = () => {
    return (
      <Row>
        {
          preferenceSections.map(({ title, key, icon, options }) => (
            thrifter.preferences[key]?.length > 0 && (
              <Col key={key} style={{marginLeft: 5, marginRight: 5}}>
                <Card style={{ marginBottom: 16 }} title={(
                  <Space align='start'>
                    {createElement(icon)}
                    <Typography.Text>{title}</Typography.Text>
                  </Space>
                )}>
                  <Space direction="vertical">
                    {
                      thrifter.preferences[key].map((preference) => (
                        <Typography.Text key={preference}>{humanize(preference)}</Typography.Text>
                      ))
                    }
                  </Space>
                </Card>
              </Col>
            )
          ))
        }
      </Row>
    )

  }

  return (
    <>
      <Typography.Title level={3}>
        Thrifting Preferences
        <Button type="link" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</Button>
      </Typography.Title>
      { editing ? <EditThrifterPreferences /> : <ViewThrifterPreferences /> }
    </>
  )
}

export default ThriftingPreferences;
