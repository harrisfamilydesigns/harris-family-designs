import React from 'react';
import { App, ConfigProvider } from 'antd';
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const Root = () => {
  return (
    <ConfigProvider theme={theme}>
      <App>
        <Router>
          <Routes />
        </Router>
      </App>
    </ConfigProvider>
  )
};

export default Root;
