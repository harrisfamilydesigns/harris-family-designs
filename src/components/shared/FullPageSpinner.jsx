import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme';

const FullPageSpinner = () => {
  return (
    <Spin fullscreen />
  );
}

export default FullPageSpinner;
