import React from 'react';

const AdminDashboardPage = () => {
  const token = localStorage.getItem('token');

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
