import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: Placeholder for the user dashboard page
const UserDashboardPage = () => {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome to the User Dashboard</p>
      <Button type="primary" onClick={logout}>Logout</Button>
    </div>
  );
}

export default UserDashboardPage;
