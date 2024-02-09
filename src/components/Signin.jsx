// SignInForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../App';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${server}/loginUser`, { email, password }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      localStorage.setItem('email', email);
      console.log(response.data); // You can handle the response accordingly
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // You can customize the error message
    }
  };

  return (
    <div className="page-content">
      <div className="form-v9-content">
        <form className="form-detail" onSubmit={handleSignIn}>
          <h2>Sign In</h2>
          <div className="form-row">
            <input
              type="text"
              name="your-email"
              id="your-email"
              className="input-text"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="password"
              id="password"
              className="input-text"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-row-last">
            <input type="submit" name="signin" className="signin" value="Sign In" />
          </div>
          <div className='form-row-last'>
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
