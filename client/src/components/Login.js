import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = { email, password };
    const res = await axios.post('/api/user/login', formData);
    if (res.data) {
      localStorage.setItem('token', res.data.token);
      const user = res.data.user;
      history.push(`/dashboard/${user._id}`);
    } else {
      alert('Invalid Credential');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Enter your email here...'
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter password here...'
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <button type='submit'>Sign in</button>
      </form>
    </div>
  );
}
