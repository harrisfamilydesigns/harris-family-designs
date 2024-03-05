import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginUrl = process.env.NODE_ENV === 'production'
      ? 'https://api.harrisfamilydesigns.com/users/sign_in'
      : 'http://localhost:3000/users/sign_in';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      const data = await response.json();
      localStorage.setItem('token', data.token);
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
