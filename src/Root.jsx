import React from 'react';
import { App } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const Root = () => {
  return (
    <App>
      <Router>
        <Routes />
      </Router>
    </App>
  )
};

export default Root;
