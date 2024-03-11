import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

// TODO: Placeholder for the login page
const LoginPage = () => {

  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem('token', 'testLogin')
    navigate('/');
  }

  return (
    <form>
      <label>
        Email:
        <input type="email" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <Button onClick={() => login()} type="primary" htmlType="submit">
        Login
      </Button>
      <div>
        or
        <Button onClick={() => navigate('/register')} type="link">
          Register
        </Button>
      </div>
    </form>
  );
}

export default LoginPage;
