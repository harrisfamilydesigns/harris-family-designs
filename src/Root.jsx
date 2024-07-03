import React, { Suspense, lazy } from 'react';
import FullPageSpinner from './components/shared/FullPageSpinner';
import { App, ConfigProvider } from 'antd';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfirmEmail from './components/SecondHandApp/ConfirmEmail';
import ResetPasswordPage from './components/shared/ResetPasswordPage';
import LoggedOutLayout from './components/shared/LoggedOutLayout';

// Lazy load the apps
const WWWApp = lazy(() => import('./components/WWWApp/Root'));
const SecondHandApp = lazy(() => import('./components/SecondHandApp/Root'));
const BudgetTrackerApp = lazy(() => import('./components/BudgetTrackerApp/Root'));

const Root = () => {
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
              <Route path="/budget_tracker" element={<BudgetTrackerApp />} />
              <Route path="/2ndhandfix/*" element={<SecondHandApp />} />
              <Route path="*" element={<WWWApp />} />
            </Routes>
          </Router>
        </Suspense>
      </App>
    </ConfigProvider>
  )
};

export default Root;
