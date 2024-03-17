import React from 'react';
import { Card, Col, Row } from 'antd';
import { row, card } from '../../styles';

const CardLayout = ({ children, ...props }) => {
  return (
    <Row justify='center' style={row.m20}>
      <Col
        xs={24}
        md={20}
        lg={16}
        xl={12}
        style={row.flexRowCenterCenter}
      >
        <Card style={card.fullWidth} {...props}>
          {children}
        </Card>
      </Col>
    </Row>
  );
}

export default CardLayout;
