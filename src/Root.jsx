import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLoginPage from './components/AdminLoginPage';
import LandingPage from './components/LandingPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import AppLayout from './components/AppLayout';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<LandingPage/>} />
          <Route path="about" element={<LandingPage/>} />
          <Route path="products" element={<LandingPage/>} />
          <Route path="contact" element={<LandingPage/>} />

          <Route path="admin_login" element={<AdminLoginPage/>} />
          <Route path="admin" element={<AdminDashboardPage/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Root;
