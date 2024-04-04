import React, { useState, useEffect, Suspense, lazy } from 'react';
import FullPageSpinner from './components/shared/FullPageSpinner';
import { App, ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { combineTheme } from './theme/combineTheme';
import { useTheme } from './contexts/ThemePreferenceContext';

// Lazy load the apps
const WWWApp = lazy(() => import('./components/WWWApp/Root'));
const SecondHandApp = lazy(() => import('./components/SecondHandApp/Root'));
const ConfirmEmail = lazy(() => import('./components/SecondHandApp/ConfirmEmail'))
const ResetPasswordPage = lazy(() => import('./components/shared/ResetPasswordPage'));
const LoggedOutLayout = lazy(() => import('./components/SecondHandApp/LoggedOutLayout'));

const Root = () => {
  const [subdomain, setSubdomain] = useState('');
  const { themePreference, theme } = useTheme();
  console.log('theme: ', theme)
  console.log('themePreference: ', themePreference)

  useEffect(() => {
    const hostnameArray = window.location.hostname.split('.');
    if (hostnameArray.length >= 3) { // Basic check for a subdomain
      setSubdomain(hostnameArray[0]);
    }
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <App>
        <Suspense fallback={<FullPageSpinner />}>
          <Router>
            <Routes>
              <Route path="/email/confirm" element={<LoggedOutLayout />} >
                <Route index element={<ConfirmEmail />} />
              </Route>
              <Route path="/password/reset" element={<LoggedOutLayout />} >
                <Route index element={<ResetPasswordPage />} />
              </Route>
              <Route path="*" element={
                subdomain === 'secondhand' ? <SecondHandApp /> : <WWWApp />
              } />
            </Routes>
          </Router>
        </Suspense>
      </App>
    </ConfigProvider>
  )
};

export default Root;
