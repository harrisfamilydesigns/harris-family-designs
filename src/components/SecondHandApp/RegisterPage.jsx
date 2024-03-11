import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: Placeholder for the register page
const RegisterPage = () => {

  const navigate = useNavigate();

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
      <label>
        Confirm Password:
        <input type="password" />
      </label>
      <button type="submit">Register</button>
      <div>
        or
        <Button onClick={() => navigate('/login')} type="link">
          Log in
        </Button>
      </div>
    </form>
  );
}

export default RegisterPage;
