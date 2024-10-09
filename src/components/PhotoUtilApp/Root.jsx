import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AppLayout from './AppLayout';
import RemoveBg from './RemoveBg';

const Root = () => {
  return useRoutes([
    { path: '/', element: <AppLayout />, children: [
      { index: true, element: <Navigate to='remove_bg' /> },
      { path: 'remove_bg', element: <RemoveBg /> },
    ]},
  ]);
};

export default Root;
