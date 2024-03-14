import React from 'react';
import { tokenProvider } from '../../api';

const AdminDashboardPage = () => {
  const token = tokenProvider.getToken();

  return (
    <div>
      <h1>Welcome to the admin dashboard</h1>
      <p>
        {token ? 'You are logged in' : 'You are not logged in'}
      </p>
    </div>
  );
}

export default AdminDashboardPage;
