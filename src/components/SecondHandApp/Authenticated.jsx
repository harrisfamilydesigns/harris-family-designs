import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const Authenticated = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <Outlet />
  );
}

export default Authenticated;
