import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const instance = axios.create({
        baseURL: 'http://localhost:3001',
        });
      const response = await instance.post('/login', {
       "email": email,
       "password": password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onLoginSuccess(response?.data?.token);
      setError(null);
      navigate('/reservations');
    } catch (err) {
      setError('Login failed. Please check your credentials.' + err);
  };
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Login;
