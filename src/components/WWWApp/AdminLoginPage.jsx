import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../api';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.login(email, password);
      navigate('/admin');

      // Redirect to admin dashboard or show error message based on the response
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLoginPage;
