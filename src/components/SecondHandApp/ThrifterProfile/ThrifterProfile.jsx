import React from 'react';
import { useCurrentUser, useThrifter } from '../../../api';
import { Avatar, Card, Col, Collapse, Divider, Flex, Row, Space, Spin, Typography } from 'antd';
import { preferenceSections } from '../../../data/thrifterPreferences';
import { humanize } from '../../../utils/humanize';
import { ExperimentOutlined, GlobalOutlined } from '@ant-design/icons';

const ThrifterProfile = () => {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { thrifter, isLoading: isThrifterLoading } = useThrifter(currentUser?.thrifterId);
  const isLoading = isUserLoading || isThrifterLoading;

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" style={{marginTop: 16}}/>
    </div>
  );

  return (
    <>
      <Row>
        <Col span={24} md={12} lg={8}>
          <Avatar src={thrifter.avatarUrl} size={150} />
          <Typography.Title level={2} style={{ margin: 0 }}>{[currentUser.firstName, currentUser.lastName].join(' ')}</Typography.Title>
          <Typography.Text type="secondary" style={{ margin: 0 }}>{currentUser.email}</Typography.Text>
        </Col>
        <Col span={24} md={12} lg={16}>
          <Typography.Paragraph>
            <GlobalOutlined /> {thrifter.address}
          </Typography.Paragraph>

          <Typography.Paragraph>
            <ExperimentOutlined /> {humanize(thrifter.experienceLevel)}
          </Typography.Paragraph>

          <Typography.Title level={4}>
            Bio
          </Typography.Title>
          <Typography.Paragraph>
            {thrifter.bio}
          </Typography.Paragraph>

        </Col>
      </Row>

      <Divider />

      <Typography.Title level={3}>Thrifting Preferences</Typography.Title>
      <Collapse
        items={
          Object.keys(thrifter.preferences).
            sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1).
            filter((category) => thrifter.preferences[category].length > 0).
            map((category) => ({
              key: category,
              label: humanize(category),
              children: thrifter.preferences[category].
                sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1).
                map((preference) => (
                <p>{humanize(preference)}</p>
              )),
            }))
        }
      >
      </Collapse>
    </>
  )
};

export default ThrifterProfile;
