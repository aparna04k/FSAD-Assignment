import React, { useState } from 'react';
import axios from 'axios';
//import axios from './axiosConfig';
// ... rest of your Signup component code

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;

