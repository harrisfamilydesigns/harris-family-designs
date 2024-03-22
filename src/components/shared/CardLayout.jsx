import React from 'react';
import { Card, Col, Row } from 'antd';
import { row as rowStyle, card } from '../../styles';

const CardLayout = ({ children, row, col, ...props }) => {
  const defaultRowProps = { justify: 'center', style: rowStyle.m20 };
  const defaultColProps = { xs: 24, xl: 20,  style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } };

  const rowProps = {
    ...defaultRowProps,
    ...row
  };

  const colProps = {
    ...defaultColProps,
    ...col
  };

  return (

        <Row {...rowProps}>
          <Col {...colProps}>
            <Card style={card.fullWidth} {...props}>
              {children}
            </Card>
          </Col>
        </Row>
  );
}

export default CardLayout;
