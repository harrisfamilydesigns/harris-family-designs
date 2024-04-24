import React from 'react';
import { useCurrentUser, useThrifter } from '../../../api';
import { Avatar, Card, Col, Collapse, Divider, Flex, Row, Space, Spin, Tag, Typography } from 'antd';
import { preferenceSections } from '../../../data/thrifterPreferences';
import { humanize } from '../../../utils/humanize';
import { ExperimentOutlined } from '@ant-design/icons';
import { IconGlobe } from '@tabler/icons-react';
import ThriftingPreferences from './ThriftingPreferences';
import ChangeAvatar from './ChangeAvatar';
import ChangeName from './ChangeName';

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
          <ChangeAvatar />
          <ChangeName />
          <Typography.Text type="secondary" style={{ margin: 0 }}>{currentUser.email}</Typography.Text>
        </Col>
        <Col span={24} md={12} lg={16}>
          <Typography.Paragraph>
            <IconGlobe size={14}/> {thrifter.address}
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

          <Tag color={thrifter.stripeAccountId ? 'green' : 'default'}>
            <Typography.Text>
              {thrifter.stripeAccountId ? 'Connected to Stripe' : 'Not connected to Stripe'}
            </Typography.Text>
          </Tag>
        </Col>
      </Row>

      <Divider />
      <ThriftingPreferences />
    </>
  )
};

export default ThrifterProfile;
