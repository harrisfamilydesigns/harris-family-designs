import React from 'react';
import { useRoutes } from 'react-router-dom';
import MapComponent from './MapComponent';

const GolfShotApp = () => {
  return useRoutes([
    { root: '/', children: [
      { index: true, element: <MapComponent /> },
    ]},
  ]);
};

export default GolfShotApp;
