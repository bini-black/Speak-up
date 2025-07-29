import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      alert('Login failed: no code received');
      navigate('/login');
      return;
    }

    // Send code to backend to exchange for token & user info
    axios.post('http://localhost:5000/api/auth/login', { code })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/chatroom');
      })
      .catch((err) => {
        console.error('Login error:', err);
        alert('Login failed');
        navigate('/login');
      });
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default Callback;
