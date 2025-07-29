import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input name="name" onChange={handleChange} value={formData.name} className="w-full p-2 border rounded" placeholder="Name" required />
        <input name="email" onChange={handleChange} value={formData.email} className="w-full p-2 border rounded" placeholder="Email" type="email" required />
        <input name="password" onChange={handleChange} value={formData.password} className="w-full p-2 border rounded" placeholder="Password" type="password" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
        <p className="text-center mt-2">Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
