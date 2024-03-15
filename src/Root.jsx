import React, { useState, useEffect, Suspense, lazy } from 'react';
import FullPageSpinner from './components/shared/FullPageSpinner';
import { ConfigProvider } from 'antd';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfirmEmail from './components/SecondHandApp/ConfirmEmail';

// Lazy load the apps
const WWWApp = lazy(() => import('./components/WWWApp/Root'));
const SecondHandApp = lazy(() => import('./components/SecondHandApp/Root'));

const Root = () => {
  const [subdomain, setSubdomain] = useState('');

  useEffect(() => {
    const hostnameArray = window.location.hostname.split('.');
    if (hostnameArray.length >= 3) { // Basic check for a subdomain
      setSubdomain(hostnameArray[0]);
    }
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <Suspense fallback={<FullPageSpinner />}>
        <Router>
          <Routes>
            <Route path="/email/confirm" element={<ConfirmEmail />} />
            <Route path="*" element={
              subdomain === 'secondhand' ? <SecondHandApp /> : <WWWApp />
            } />
          </Routes>
        </Router>
      </Suspense>
    </ConfigProvider>
  )
};

export default Root;
