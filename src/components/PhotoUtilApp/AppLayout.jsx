import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const AppLayout = () => {
  return (
    <Outlet />
  );
}

export default AppLayout;
