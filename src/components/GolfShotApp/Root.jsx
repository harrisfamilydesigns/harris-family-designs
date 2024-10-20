import React from 'react';
import { useRoutes } from 'react-router-dom';
import Main from './Main';

const GolfShotApp = () => {
  return useRoutes([
    { root: '/', children: [
      { index: true, element: <Main /> },
    ]},
  ]);
};

export default GolfShotApp;
