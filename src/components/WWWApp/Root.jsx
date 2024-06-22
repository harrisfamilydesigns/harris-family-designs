import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLoginPage from './AdminLoginPage';
import LandingPage from './LandingPage';
import AdminDashboardPage from './AdminDashboardPage';
import AppLayout from './AppLayout';
import FullPageSpinner from '../shared/FullPageSpinner';
import SearchParamsAlert from '../shared/SearchParamsAlert';
import ProjectsPage from './ProjectsPage';

const Root = () => {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <SearchParamsAlert />
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<LandingPage/>} />
          <Route path="about" element={<LandingPage/>} />
          <Route path="projects" element={<ProjectsPage/>} />
          <Route path="contact" element={<LandingPage/>} />

          <Route path="admin_login" element={<AdminLoginPage/>} />
          <Route path="admin" element={<AdminDashboardPage/>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default Root;
